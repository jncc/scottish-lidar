
import * as React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// import { AddToBasketButton } from './AddToBasketButton'
import { State } from '../../state'

type Props = {
  collections: State['collections']
}

let config = {
  defaultZoom: 7,
  maximumZoom: 13,
  defaultCenter: [56.00, -4.5] as [number, number],
  baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
  attribution: `Backdrop &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

export const MapScreen = (props: Props) => {
  
  React.useEffect(() => {
    var mymap = L.map('mapid').setView(config.defaultCenter, config.defaultZoom)
    L.tileLayer(config.baseLayerUrlTemplate, {
      attribution: config.attribution,
      maxZoom: config.maximumZoom,
    }).addTo(mymap)

    L.marker(config.defaultCenter).addTo(mymap)
  }, [])

  React.useEffect(() => {
    let body = document.querySelector('body') as HTMLElement
    body.classList.add('no-scroll')
  }, [])

  return (
    <div className="map-wrapper">
      <div className="left-bar">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi morbi tempus. Tincidunt id aliquet risus feugiat in ante metus dictum. Velit euismod in pellentesque massa placerat duis. Lorem dolor sed viverra ipsum. Dui faucibus in ornare quam viverra. Mauris augue neque gravida in. Ac tortor dignissim convallis aenean et tortor at risus. Tortor consequat id porta nibh venenatis cras sed felis. Sollicitudin tempor id eu nisl nunc. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras.
        In ornare quam viverra orci sagittis eu volutpat. Enim nunc faucibus a pellentesque sit amet. Bibendum at varius vel pharetra vel turpis nunc eget. Nibh tellus molestie nunc non blandit massa enim nec. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Adipiscing tristique risus nec feugiat in fermentum. Scelerisque eleifend donec pretium vulputate sapien nec. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Eget est lorem ipsum dolor sit amet consectetur adipiscing. Quisque egestas diam in arcu cursus euismod quis viverra. Viverra ipsum nunc aliquet bibendum. Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Id consectetur purus ut faucibus pulvinar. Neque ornare aenean euismod elementum nisi quis eleifend quam. Nunc sed id semper risus in hendrerit gravida. In hendrerit gravida rutrum quisque non tellus orci ac auctor.
      </div>
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
