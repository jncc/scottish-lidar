
import * as React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

// import icon from 'leaflet/dist/images/marker-icon.png'
// import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import { AddToBasketButton } from './AddToBasketButton'
import { State } from '../../state'

type Props = {
  collections: State['collections']
}

let config = {
  defaultZoom: 7,
  maximumZoom: 13,
  defaultCenter: [56.50, -4] as [number, number],
  baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
  attribution: `Backdrop &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
}
export const MapScreen = (props: Props) => {
  
  const mapElement = React.useRef(null)

  React.useEffect(() => {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: config.attribution,
      maxZoom: config.maximumZoom,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA'
    }).addTo(mymap)
  }, [])

  return (
    <div className="map-wrapper">
      <div id="mapid" className="map">
        {/* <Map center={config.defaultCenter} zoom={config.defaultZoom}>
          <TileLayer
            attribution={config.attribution}
            url={config.baseLayerUrlTemplate}
          />
        </Map> */}
      </div>
    </div>
  )
}

// defaultQuery: {
//   collections: [`7d96723a-49c9-4d17-8df1-2a96932112d4`], // Phase 1 DSM collection
//   bbox:        [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number] ,
//   start:       `2016-06-01`,
//   end:         `2016-06-31`,
// },
// defaultQueryResultInfo: {
//   bboxArea:    13679,
//   total:       0
// }
