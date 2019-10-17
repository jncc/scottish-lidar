
import React from 'react'
import L from 'leaflet'

import { config } from './config'

export const Map = () => {

  React.useEffect(() => {

    var mymap = L.map('themap').setView(config.defaultCenter, config.defaultZoom)

    L.tileLayer(config.baseLayerUrlTemplate, {
        attribution: config.attribution,
        maxZoom: config.maximumZoom,
      }).addTo(mymap)
    
    // L.marker(config.defaultCenter).addTo(mymap)
  
    L.tileLayer.wms('https://srsp-ows.jncc.gov.uk:443/scotland/wms', {
        layers: 'scotland:lidar-aggregate',
        format: 'image/png',
        opacity: 0.6,
        transparent: true,
      }).addTo(mymap)
    }, [])

  return <div id="themap" className="map"></div>
}
