
import * as React from 'react'

import { CollectionTuple } from '../../state'
import { Product } from '../../catalog/types'
import { LeafletMap } from './LeafletMap'
import { ProductListPanel } from './ProductListPanel'
import { DatasetListPanels } from './DatasetListPanels'
import { Bbox } from './types'

// import { AddToBasketButton } from './AddToBasketButton'

type Props = {
  collections: CollectionTuple[]
  collection: string
  setCollection: (collectionName: string) => void
  bbox: Bbox
  setBbox: (bbox: Bbox) => void
  wmsLayer: { url: string, name: string } | undefined
  products: Product[]
  productCountByCollection: { collectionName: string, products: number }[]
}

export const MapScreenLayout = (props: Props) => {

  let currentCollection = props.collections
    .find(c => c.collection.name === props.collection)
    
  return <>
    {makeSmallScreenWarningUI()}
    <div className="bottom-left-control-group">
      Bottom left controls
    </div>
    <div className="bottom-right-control-group">
      Bottom right controls
    </div>
    <div className="r">
      {currentCollection &&
      <div className="panel right-panel">
        <ProductListPanel
          products={props.products}
          collection={currentCollection}
        />
      </div>
      }
      <div className="left-panel-container">
        <DatasetListPanels
          collections={props.collections}
          productCountByCollection={props.productCountByCollection}   
          collection={props.collection}
          setCollection={props.setCollection}       
        />
      </div>
    </div>
    <LeafletMap bbox={props.bbox} setBbox={props.setBbox} wmsLayer={props.wmsLayer} />
  </>
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
        