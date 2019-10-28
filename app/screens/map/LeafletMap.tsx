
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

var productFootprintLayerGroup: L.LayerGroup
var collectionWmsLayerGroup: L.LayerGroup

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

  // set the collection wms layer when it changes
  React.useEffect(() => {
    if (props.wmsLayer && collectionWmsLayerGroup) {
      let wmsOptions = {
        layers: props.wmsLayer.name,
        format: 'image/png',
        transparent: true,
        // tiled: true - how to set?
      }

      // currently Geoserver appears to return no data  
      // the catalog has these details:
      // {url: "https://srsp-ows.jncc.gov.uk/ows", name: "scotland:scotland-lidar-1-dsm"}

      // let layer = L.tileLayer.wms(props.wmsLayer.url, wmsOptions)
      let layer = L.tileLayer.wms('https://eo.jncc.gov.uk/geoserver/scotland/wms', wmsOptions)
      
      collectionWmsLayerGroup.clearLayers()
      collectionWmsLayerGroup.addLayer(layer)
    }
  }, [props.wmsLayer])

  // react has nothing to do with the leaflet map;
  // map manipulation is performed via side-effects
  return <div id="leaflet-map"></div>
}
