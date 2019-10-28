
import React from 'react'
import L from 'leaflet'
import 'leaflet-editable'
// import 'leaflet-fullscreen'

import { config } from './config'
import { bboxFlatArrayToCoordArray } from '../../utility/geospatialUtility'
import { roundTo3Decimals } from '../../utility/numberUtility'
import { Bbox } from './types'

type Props = {
  bbox: Bbox
  setBbox: (bbox: Bbox) => void
  wmsLayer: { url: string, name: string } | undefined
}

var footprintLayerGroup: L.LayerGroup
var visualLayerGroup: L.LayerGroup

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
    footprintLayerGroup = L.layerGroup([]).addTo(map)
    visualLayerGroup = L.layerGroup([]).addTo(map)

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

    // add layer groups
    let productFootprintLayerGroup = L.layerGroup([]).addTo(map)
    let productWmsLayerGroup = L.layerGroup([]).addTo(map)
    let collectionWmsLayerGroup = L.layerGroup([]).addTo(map)

    // test hardcoded WMS layer using same options as existing Deli
    // currently Geoserver appears to return no data  
    // the catalog has these details:
    // {url: "https://srsp-ows.jncc.gov.uk/ows", name: "scotland:scotland-lidar-1-dsm"}
    // the aggregate layer has url of https://srsp-ows.jncc.gov.uk:443/scotland/wms
    let wmsOptions = {
      layers: 'scotland:scotland-lidar-1-dsm',
      format: 'image/png',
      transparent: true,
      // tiled: true - how to set?
    }
    L.tileLayer.wms('https://srsp-ows.jncc.gov.uk/ows', wmsOptions).addTo(map)

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

  // React.useEffect(() => {
  //   console.log('in update')
  //   console.log(props.wmsLayer)
  //   console.log(visualLayerGroup)
  //   if (props.wmsLayer && visualLayerGroup) {

  //     console.log('HELLO')
  //       let wmsOptions = {
  //         layers: props.wmsLayer.name,
  //         format: 'image/png',
  //         transparent: true
  //       }
  //       let layer = L.tileLayer.wms(props.wmsLayer.url, wmsOptions)
  //       visualLayerGroup.addLayer(layer)
  //     }
  // }, [props.wmsLayer])

  // react has nothing to do with the leaflet map;
  // map manipulation is performed via side-effects
  return <div id="leaflet-map"></div>
}
