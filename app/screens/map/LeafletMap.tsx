
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import L, { TileLayerOptions } from 'leaflet'
import 'leaflet-editable'

import { config } from './config'
import { bboxFlatArrayToCoordArray } from '../../utility/geospatialUtility'
import { roundTo3Decimals } from '../../utility/numberUtility'
import { Product } from '../../catalog/types'
import { GeoJsonObject } from 'geojson'
import { State, AppActions, DispatchProps, initialState } from '../../state'
import { makeBasketItemFromProduct } from '../../basket'

type Props = {
  products: Product[]  
  wmsLayer?: { url: string, name: string }
}
type StateProps = State

let collectionWmsLayerGroup: L.LayerGroup
let productFootprintLayerGroup: L.LayerGroup
let aggregateLayer: L.Layer
let currentProducts: { product: Product, footprint: L.GeoJSON<any> }[]
let map: L.Map
let bboxRect: L.Rectangle

let LeafletMapComponent = (props: Props & StateProps & DispatchProps) => {

  React.useEffect(() => {
    
    map = L.map('leaflet-map', {
      minZoom: 2,
      maxZoom: config.maximumZoom,
      editable: true, // enable leaflet.editable plugin
    })

    map.setView(props.mapScreen.leaflet.center, props.mapScreen.leaflet.zoom)

    // footprint and collection layers
    productFootprintLayerGroup = L.layerGroup([]).addTo(map)
    collectionWmsLayerGroup = L.layerGroup([]).addTo(map)

    // base layer
    L.tileLayer(config.baseLayerUrlTemplate, {
      // the `baseLayer` property (the value of which is interpolated into
      // baseLayerUrlTemplate's {id} placeholder) was added after v1 release,
      // so existing users might not have the property in their session state
      id: props.mapScreen.baseLayer ?? initialState.mapScreen.baseLayer,
      attribution: config.attribution,
      maxZoom: config.maximumZoom,
    }).addTo(map)
  
    // aggregate layer
    aggregateLayer = L.tileLayer.wms(config.aggregateLayer.baseUrl, {
      layers: config.aggregateLayer.layer,
      format: config.aggregateLayer.format,
      opacity: config.aggregateLayer.opacity,
      transparent: config.aggregateLayer.transparent,
      tiled: true // custom parameter for Geoserver tilecache
    } as TileLayerOptions).addTo(map)

    // add the bbox rectangle
    bboxRect = L.rectangle(
      L.latLngBounds(bboxFlatArrayToCoordArray(props.mapScreen.bbox)), { fillOpacity: 0 }
    )
    bboxRect.addTo(map)
    bboxRect.enableEdit() // enable a moveable bbox with leaflet.editable

    // update the query state when the bbox is altered
    map.on('editable:vertex:dragend', (e: any) => {
      if (e.layer === bboxRect) { // e.layer property added by leaflet-editable
        let b = bboxRect.getBounds()
        let bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]
          .map(roundTo3Decimals) as State['mapScreen']['bbox']
        props.dispatch(AppActions.setBbox(bbox))
      }
    })

    // save the map view so we can come back to it from a different screen
    map.on('zoomend', () => {
      props.dispatch(AppActions.leafletZoomChanged(map.getZoom()))
    })
    map.on('moveend', () => {
      props.dispatch(AppActions.leafletCenterChanged([map.getCenter().lat, map.getCenter().lng]))
    })
  }, [])

  React.useEffect(() => {

    // set the position
    map.setView(props.mapScreen.leaflet.center, props.mapScreen.leaflet.zoom, { animate: false })

    // redraw the bbox rectangle
    bboxRect.remove()
    bboxRect = L.rectangle(
      L.latLngBounds(bboxFlatArrayToCoordArray(props.mapScreen.bbox)), { fillOpacity: 0 }
    )
    bboxRect.addTo(map)
    bboxRect.enableEdit() // enable a moveable bbox with leaflet.editable

  }, [props.mapScreen.leaflet.redraw])

  // set the zoom when it changes (effectively a no-op when zoom changed by double-clicking / keyboard)
  React.useEffect(() => {
    map.setZoom(props.mapScreen.leaflet.zoom)
  }, [props.mapScreen.leaflet.zoom])

  // toggle the visualisation layers
  React.useEffect(() => {
    if (props.mapScreen.visualise) {
      map.addLayer(aggregateLayer)
      map.addLayer(collectionWmsLayerGroup)
    } else {
      map.removeLayer(aggregateLayer)
      map.removeLayer(collectionWmsLayerGroup)
    }
  }, [props.mapScreen.visualise])

  // draw the wms layer when it changes
  React.useEffect(() => {
    if (props.wmsLayer && collectionWmsLayerGroup) {

      let layer = L.tileLayer.wms(props.wmsLayer.url, {
        layers: props.wmsLayer.name,
        format: 'image/png',
        transparent: true,
        tiled: true // custom parameter for Geoserver tilecache
      } as TileLayerOptions)
      
      collectionWmsLayerGroup.clearLayers()
      collectionWmsLayerGroup.addLayer(layer)
    }
  }, [props.wmsLayer])

  // draw the product footprints when the products or basket items change
  React.useEffect(() => {
    productFootprintLayerGroup.clearLayers()
    
    if (props.products.length) {

      let makeProductFootprintLayer = (p: Product) => {
        let footprint = L.geoJSON(p.footprint as GeoJsonObject, { style: productFootprintStyleOff } )

        footprint.on('mouseout', () => {
          props.dispatch(AppActions.productUnhovered(p))
        })
        footprint.on('mouseover', () => {
          props.dispatch(AppActions.productHovered(p))
        })
        footprint.on('click', () => {
          props.dispatch(AppActions.toggleItem(makeBasketItemFromProduct(p)))
        })

        if (props.basket.some(item => item.id === p.id)) {
          footprint.setStyle(() => productFootprintStyleOn)
        }

        return footprint
      }

      currentProducts = props.products.map(p => ({
          product: p,
          footprint: makeProductFootprintLayer(p)
        })
      )
      currentProducts.forEach(x => {
        x.footprint.addTo(productFootprintLayerGroup)
      })
    }
  }, [
    props.products.map(p => p.id).join(','),
    props.basket.map(item => item.id).join(',')
  ]) // make comparator dependency strings for React

  // highlight the currently hovered product
  React.useEffect(() => {

    if (currentProducts) {
      // unhighlight any previously hovered product
      // (if it's not in the basket)
      currentProducts.forEach(x => {
        if (props.basket.some(item => item.id === x.product.id)) {
          x.footprint.setStyle(() => productFootprintStyleOn)
        } else {
          x.footprint.setStyle(() => productFootprintStyleOff)
        }
      })
      let hovered = currentProducts.find(x => x.product === props.mapScreen.hovered)
      if (hovered) {
        hovered.footprint.setStyle(() => productFootprintStyleOn)
      }
    }
  }, [props.mapScreen.hovered, props.basket.map(item => item.id).join(',')])

  // react has nothing to do with the leaflet map;
  // map manipulation is performed via side-effects
  return <div id="leaflet-map"></div>
}

export const LeafletMap = reduxConnect(
  (s: State): StateProps => {
    return s
  }
)(LeafletMapComponent)

let productFootprintStyleOff = { fillOpacity: 0, weight: 1, color: '#fff' }
let productFootprintStyleOn =  { fillOpacity: 0, weight: 3, color: '#fff' }
