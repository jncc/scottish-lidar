
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
}

export const LeafletMap = (props: Props) => {

  React.useEffect(() => {

    var map = L.map('themap', {
      minZoom: 2,
      maxZoom: config.maximumZoom,
      editable: true, // enable leaflet.editable pluginleag
    })

    // enable leaflet.fullscreen plugin
    // new L.Control.Fullscreen({ position: 'topright' }).addTo(map)

    map.setView(config.defaultCenter, config.defaultZoom)

    L.tileLayer(config.baseLayerUrlTemplate, {
        attribution: config.attribution,
        maxZoom: config.maximumZoom,
      }).addTo(map)
    
    L.tileLayer.wms('https://srsp-ows.jncc.gov.uk:443/scotland/wms', {
        layers: 'scotland:lidar-aggregate',
        format: 'image/png',
        opacity: 0.6,
        transparent: true,
      }).addTo(map)

    // add layer groups
    let productFootprintLayerGroup = L.layerGroup([]).addTo(map)
    let productWmsLayerGroup = L.layerGroup([]).addTo(map)
    let collectionWmsLayerGroup = L.layerGroup([]).addTo(map)

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

  // react has nothing to do with the leaflet map;
  // map manipulation is handled with side-effects
  return <div id="themap" className="map"></div>
}
