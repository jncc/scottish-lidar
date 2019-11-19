
import React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import L, { TileLayerOptions } from 'leaflet'
import 'leaflet-editable'
import { useCookies } from 'react-cookie'

import { config } from './config'
import { bboxFlatArrayToCoordArray } from '../../utility/geospatialUtility'
import { roundTo3Decimals } from '../../utility/numberUtility'
import { Product } from '../../catalog/types'
import { GeoJsonObject } from 'geojson'
import { State, MapActions, DispatchProps } from '../../state'
import { BasketItem, COOKIE_NAME, toggleBasketItem, getBasket } from '../../basket'

type Props = {
  products: Product[]  
  wmsLayer?: { url: string, name: string }
  // useBasketResult: UseBasketResult
}
type StateProps = State['mapScreen']

var collectionWmsLayerGroup: L.LayerGroup
var productFootprintLayerGroup: L.LayerGroup
var currentProducts: { product: Product, footprint: L.GeoJSON<any> }[]

let LeafletMapComponent = (props: Props & StateProps & DispatchProps) => {

  let useCookiesResult = useCookies([COOKIE_NAME])
  let basket = getBasket(useCookiesResult)

  React.useEffect(() => {

    let map = L.map('leaflet-map', {
      minZoom: 2,
      maxZoom: config.maximumZoom,
      editable: true, // enable leaflet.editable plugin
    })

    // zoom controls
    // new L.Control.Zoom({ position: 'bottomleft' }).addTo(map)

    map.setView(props.leaflet.center, props.leaflet.zoom)

    // add layer groups
    productFootprintLayerGroup = L.layerGroup([]).addTo(map)
    collectionWmsLayerGroup = L.layerGroup([]).addTo(map)

    // base layer
    L.tileLayer(config.baseLayerUrlTemplate, {
      attribution: config.attribution,
      maxZoom: config.maximumZoom,
    }).addTo(map)
  
    // aggregate layer
    L.tileLayer.wms(config.aggregateLayer.baseUrl, {
      layers: config.aggregateLayer.layer,
      format: config.aggregateLayer.format,
      opacity: config.aggregateLayer.opacity,
      transparent: config.aggregateLayer.transparent,
      tiled: true // custom parameter for Geoserver tilecache
    } as TileLayerOptions).addTo(map)

    // add the bbox rectangle
    let bboxRect = L.rectangle(
      L.latLngBounds(bboxFlatArrayToCoordArray(props.bbox)), { fillOpacity: 0 }
    )
    bboxRect.addTo(map)
    bboxRect.enableEdit() // enable a moveable bbox with leaflet.editable

    // update the query state when the bbox is altered
    map.on('editable:vertex:dragend', (e: any) => {
      if (e.layer === bboxRect) { // e.layer property added by leaflet-editable
        let b = bboxRect.getBounds()
        let bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]
          .map(roundTo3Decimals) as State['mapScreen']['bbox']
        props.dispatch(MapActions.setBbox(bbox))
      }
    })

    // save the map view so we can come back to it from a different screen
    map.on('zoomend', () => {
      props.dispatch(MapActions.leafletZoomChanged(map.getZoom()))
    })
    map.on('moveend', () => {
      props.dispatch(MapActions.leafletCenterChanged([map.getCenter().lat, map.getCenter().lng]))
    })
  }, [props.leaflet.redraw])

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

  // draw the product footprints when the products change
  React.useEffect(() => {
    productFootprintLayerGroup.clearLayers()
    
    if (props.products.length) {

      let makeProductFootprintLayer = (p: Product) => {
        let footprint = L.geoJSON(p.footprint as GeoJsonObject, { style: footprintStyleOff } )

        footprint.on('mouseout', () => {
          props.dispatch(MapActions.productUnhovered(p))
        })
        footprint.on('mouseover', () => {
          props.dispatch(MapActions.productHovered(p))
        })
        footprint.on('click', () => {
          const result = toggleBasketItem(useCookiesResult, {
            id: p.id,
            name: p.name,
            title: p.metadata.title,
            url: p.data.product!.http!.url,
            type: p.data.product!.http!.type!,
            size: p.data.product!.http!.size!,
          })
          if (result === 'added') {
            footprint.setStyle(() => footprintStyleOn)
          } else {
            footprint.setStyle(() => footprintStyleOff)
          }
        })

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

      highlightFootprints(props.hovered, basket.items)

    }
  }, [props.products.map(p => p.id).join(',')]) // make a comparator string for React

  // highlight the footprints (currently hovered product & the products in the basket)
  React.useEffect(() => {
    highlightFootprints(props.hovered, basket.items)
  }, [props.hovered, basket.items.map(item => item.id).join(',')])

  // react has nothing to do with the leaflet map;
  // map manipulation is performed via side-effects
  return <div id="leaflet-map"></div>
}

export const LeafletMap = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(LeafletMapComponent)

const footprintStyleOff = { fillOpacity: 0, weight: 1, color: '#555' }
const footprintStyleOn =  { fillOpacity: 0, weight: 2, color: '#444' }

const highlightFootprints = (hovered: Product | undefined, basketItems: BasketItem[]) => {

  if (currentProducts) {
    // unhighlight any previously hovered product
    // (if it's not in the basket)
    currentProducts.forEach(x => {
      if (basketItems.some(item => item.id === x.product.id)) {
        x.footprint.setStyle(() => footprintStyleOn)
      } else {
        x.footprint.setStyle(() => footprintStyleOff)
      }
    })
    let hoveredProduct = currentProducts.find(x => x.product === hovered)
    if (hoveredProduct) {
      hoveredProduct.footprint.setStyle(() => footprintStyleOn)
    }
  }


}
