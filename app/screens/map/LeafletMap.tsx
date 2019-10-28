
import React from 'react'
import L from 'leaflet'
import 'leaflet-editable'
// import 'leaflet-fullscreen'

import { config } from './config'
import { bboxFlatArrayToCoordArray } from '../../utility/geospatialUtility'
import { roundTo3Decimals } from '../../utility/numberUtility'
import { Bbox } from './types'
import { Product } from '../../catalog/types'
import { GeoJsonObject } from 'geojson'

type Props = {
  bbox: Bbox
  setBbox: (bbox: Bbox) => void
  products: Product[]  
  wmsLayer?: { url: string, name: string }
  hoveredProduct?: Product
  productHovered: (p: Product) => void
  productUnhovered: (p: Product) => void
}

var collectionWmsLayerGroup: L.LayerGroup
var productFootprintLayerGroup: L.LayerGroup
var currentProducts: { product: Product, footprint: L.GeoJSON<any> }[]

export const LeafletMap = (props: Props) => {

  React.useEffect(() => {

    var map = L.map('leaflet-map', {
      minZoom: 2,
      maxZoom: config.maximumZoom,
      editable: true, // enable leaflet.editable plugin
    })

    // enable leaflet.fullscreen plugin
    // new L.Control.Fullscreen({ position: 'topright' }).addTo(map)

    map.setView(config.defaultCenter, config.defaultZoom)

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
      transparent: config.aggregateLayer.transparent
    }).addTo(map)

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
          .map(roundTo3Decimals) as Bbox
        props.setBbox(bbox)
      }
    })
  }, [])

  // draw the collection wms layer when it changes
  React.useEffect(() => {
    if (props.wmsLayer && collectionWmsLayerGroup) {

      // currently Geoserver appears to return no data  
      // the catalog has these details:
      // {url: "https://srsp-ows.jncc.gov.uk/ows", name: "scotland:scotland-lidar-1-dsm"}

      // let layer = L.tileLayer.wms(props.wmsLayer.url, {
      let layer = L.tileLayer.wms('https://eo.jncc.gov.uk/geoserver/scotland/wms', {
        layers: props.wmsLayer.name,
        format: 'image/png',
        transparent: true,
        // tiled: true - how to set?
      })
      
      collectionWmsLayerGroup.clearLayers()
      collectionWmsLayerGroup.addLayer(layer)
    }
  }, [props.wmsLayer])

  // draw the product footprints when the products change
  React.useEffect(() => {
    productFootprintLayerGroup.clearLayers()
    
    if (props.products.length) {

      let makeProductFootprintLayer = (p: Product) => {
        let footprint = L.geoJSON(p.footprint as GeoJsonObject, { style: productFootprintStyleOff } )

        footprint.on('mouseout', () => {
          footprint.setStyle(() => productFootprintStyleOff)
          props.productUnhovered(p)
        })

        footprint.on('mouseover', () => {
          footprint.setStyle(() => productFootprintStyleOn)
          props.productHovered(p)
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
    }
  }, [props.products.map(p => p.id).join(',')]) // make a comparator string for React

  // highlight the currently hovered product
  React.useEffect(() => {

    if (currentProducts) {
      // unhighlight any previously hovered product
      currentProducts.forEach(x => {
        x.footprint.setStyle(() => productFootprintStyleOff)
      })
      let hovered = currentProducts.find(x => x.product === props.hoveredProduct)
      if (hovered) {
        hovered.footprint.setStyle(() => productFootprintStyleOn)
      }
  }
  }, [props.hoveredProduct])

  // react has nothing to do with the leaflet map;
  // map manipulation is performed via side-effects
  return <div id="leaflet-map"></div>
}

let productFootprintStyleOff = { fillOpacity: 0, weight: 1, color: '#555' }
let productFootprintStyleOn =  { fillOpacity: 0, weight: 2, color: '#444' }
