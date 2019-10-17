
import * as React from 'react'

import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult } from '../../catalog/types'
import { DatasetList } from './DatasetList'
import Counter from './Counter'
// import { AddToBasketButton } from './AddToBasketButton'

type Props = {
  collections: CollectionTuple[]
  products: ProductResult
  productCountByCollection: ProductCountByCollectionResult
}

export const MapScreenLayout = (props: Props) => {

  return (
    <>
      {makeSmallScreenWarningUI()}
      <div className="container normal-page-container">
        This is the map. There are {props.collections.length} collections.
        <DatasetList
          collections={props.collections}
          productCountByCollectionForCurrentQuery={props.productCountByCollection.result}
        />
        <hr />
        {console.log(props.products)}
        <hr />
        <Counter />
      </div>
    </>
  )
}

const makeSmallScreenWarningUI = () => {
  return (
    <div className="d-lg-none text-center text-danger p-2">
      The map is made for desktop devices.
      <br />
      Please increase your screen size to use the map.
    </div>

  )
}

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

