
import * as React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { config } from './config'
// import { AddToBasketButton } from './AddToBasketButton'
import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult } from '../../catalog/types'
import Counter from './Counter'
import { loadProductCountByCollection, loadProducts } from '../../catalog/api'
import { DatasetList } from './DatasetList'

type Props = {
  collections: CollectionTuple[]
}

export const MapScreen = (props: Props) => {
      
  let [products, setProducts]
    = React.useState({ query: {}, result: [] } as ProductResult)  
  let [productCountByCollection, setProductCountByCollection]
    = React.useState({ query: {}, result: [] } as ProductCountByCollectionResult)
    
  React.useEffect(() => {
    if (props.collections.length) { // wait until collections are loaded
      let query = {
        collections: props.collections.map(c => c.collection.name),
        bbox: config.defaultQuery.bbox
      }
      Promise.all([loadProducts(query), loadProductCountByCollection(query)])
        .then(([products, productCountByCollection]) => {
          setProducts(products)
          setProductCountByCollection(productCountByCollection)
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
      {console.log(products)}
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
