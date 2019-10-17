
import * as React from 'react'

import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult, ProductQuery, Product } from '../../catalog/types'
import { DatasetList } from './DatasetList'
import Counter from './Counter'
import { LeafletMap } from './LeafletMap'
import { DatasetListPanels } from './DatasetListPanels'

// import { AddToBasketButton } from './AddToBasketButton'

type Props = {
  collections: CollectionTuple[]
  currentBbox: number[]
  currentCollection: string
  products: Product[]
  productCountByCollection: { collectionName: string, products: number }[]
}

export const MapScreenLayout = (props: Props) => {

  return <>
    {makeSmallScreenWarningUI()}
    <div className="bottom-left-control-group">
      Bottom left controls
    </div>
    <div className="bottom-right-control-group">
      Bottom right controls
    </div>
    <div className="r">
      <div className="panel right-panel">
        <Counter />
        <hr />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Dui accumsan sit amet nulla facilisi morbi tempus. Tincidunt id aliquet risus feugiat in ante 
        metus dictum. Velit euismod in pellentesque massa placerat duis. Lorem dolor sed viverra ipsum. Dui faucibus 
        in ornare quam viverra. Mauris augue neque gravida in. Ac tortor dignissim convallis aenean et tortor at.
        Tortor consequat id porta nibh venenatis cras sed felis. Sollicitudin tempor id eu nisl nunc. Vestibulum
        est pellentesque elit ullamcorper dignissim cras.
      </div>
      <div className="left-panel-container">
        <DatasetListPanels
          collections={props.collections}
          productCountByCollection={props.productCountByCollection}          
        />
      </div>
    </div>
    <LeafletMap bbox={props.currentBbox} />
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
        