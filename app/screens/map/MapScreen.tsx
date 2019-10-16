
import * as React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

// import { AddToBasketButton } from './AddToBasketButton'
import { CollectionTuple } from '../../state'
import { ProductCountByCollectionResult } from '../../catalog/types'
import Counter from './Counter'
import { loadProductCountByCollection } from '../../catalog/api'
import { DatasetList } from './DatasetList'

type Props = {
  collections: CollectionTuple[]
}

let config = {
  defaultZoom: 7,
  maximumZoom: 13,
  defaultCenter: [56.00, -4.5] as [number, number],
  baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
  attribution: `Backdrop &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
  defaultQuery: {
    collections: [`7d96723a-49c9-4d17-8df1-2a96932112d4`], // Phase 1 DSM collection
    bbox:        [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
  },
  defaultQueryResultInfo: {
    bboxArea:    13679,
    total:       0
  }
}

export const MapScreen = (props: Props) => {
  
  let [productCountByCollection, setProductCountByCollection]
    = React.useState({ query: {}, result: [] } as ProductCountByCollectionResult)
    
  React.useEffect(() => {
    if (props.collections.length) { // wait until collections are loaded
      let query = {
        collections: props.collections.map(c => c.collection.name),
        bbox: config.defaultQuery.bbox
      }
      loadProductCountByCollection(query).then((result) => {
        setProductCountByCollection(result)
      })
    }    
  }, [props.collections])
  
  // React.useEffect(() => {
    //   var mymap = L.map('mapid').setView(config.defaultCenter, config.defaultZoom)
    //   L.tileLayer(config.baseLayerUrlTemplate, {
      //     attribution: config.attribution,
      //     maxZoom: config.maximumZoom,
      //   }).addTo(mymap)
      
      //   L.marker(config.defaultCenter).addTo(mymap)
      
      //   var aggregateLayer = L.tileLayer.wms('https://srsp-ows.jncc.gov.uk:443/scotland/wms', {
        //     layers: 'scotland:lidar-aggregate',
        //     format: 'image/png',
        //     opacity: 0.6,
        //     transparent: true,
        //   }).addTo(mymap)
        
        // }, [])
        
        // React.useEffect(() => {
          //   let body = document.querySelector('body') as HTMLElement
          //   body.classList.add('no-scroll')
          // }, [])
          
          return (
            <>
    {makeSmallScreenWarningUI()}
    <div className="container normal-page-container">
      This is the map. There are {props.collections.length} collections.
      <DatasetList
        collections={props.collections}
        productCountByCollectionForCurrentQuery={productCountByCollection.result}
      />
      <hr />
      <Counter />
    </div>
    </>
  )
}

const makeSmallScreenWarningUI = () =>
<div className="d-lg-none text-center text-danger p-2">
    The map is made for desktop devices.
    <br />
    Please increase your screen size to use the map.
  </div>

// import icon from 'leaflet/dist/images/marker-icon.png'
// import iconShadow from 'leaflet/dist/images/marker-shadow.png'
// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow
// })
// L.Marker.prototype.options.icon = DefaultIcon

    const loadProductCountByCollectionX = (collections: CollectionTuple[]) => {

    }
