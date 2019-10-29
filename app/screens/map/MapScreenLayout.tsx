
import * as React from 'react'

import { CollectionTuple } from '../../state'
import { ProductResult, Product } from '../../catalog/types'
import { LeafletMap } from './LeafletMap'
import { ProductListPanel } from './ProductListPanel'
import { DatasetListPanels } from './DatasetListPanels'
import { Bbox } from './types'
import { Delayed } from '../../shared/Delayed'

// import { AddToBasketButton } from './AddToBasketButton'

type Props = {
  collections: CollectionTuple[]
  collection: string
  setCollection: (collectionName: string) => void
  bbox: Bbox
  setBbox: (bbox: Bbox) => void
  setPage: (n: number) => void
  wmsLayer?: { url: string, name: string }
  products: ProductResult
  productCountByCollection: { collectionName: string, products: number }[]
  hoveredProduct?: Product
  productHovered: (p: Product) => void
  productUnhovered: (p: Product) => void
}

export const MapScreenLayout = (props: Props) => {

  let currentCollection = props.collections
    .find(c => c.collection.name === props.collection)

  let productCountForCurrentCollection = props.productCountByCollection
    .filter(x => x.collectionName === props.collection)
    .map(x => x.products)
    .find(() => true)
    
  return <>
    {makeSmallScreenWarningUI()}
    <div className="d-none d-lg-block">
      <div className="bottom-left-control-group d-lg">
        Bottom left controls
      </div>
      <div className="bottom-right-control-group">
        Bottom right controls
      </div>
      <div className="r">
        <Delayed delayInMilliseconds={800}>
          <div className="panel right-panel">
            <ProductListPanel
              products={props.products}
              collection={currentCollection}
              productCountForCurrentCollection={productCountForCurrentCollection}
              setPage={props.setPage}
              hoveredProduct={props.hoveredProduct}
              productHovered={props.productHovered}
              productUnhovered={props.productUnhovered}
            />
          </div>
        </Delayed>        
        <Delayed delayInMilliseconds={800}>
          <div className="left-panel-container">
            <DatasetListPanels
              collections={props.collections}
              productCountByCollection={props.productCountByCollection}   
              collection={props.collection}
              setCollection={props.setCollection}       
            />
          </div>        
        </Delayed>
      </div>
      <LeafletMap
        bbox={props.bbox}
        setBbox={props.setBbox}
        products={props.products.result}
        wmsLayer={props.wmsLayer}
        hoveredProduct={props.hoveredProduct}
        productHovered={props.productHovered}
        productUnhovered={props.productUnhovered}
      />
    </div>
  </>
}

const makeSmallScreenWarningUI = () => {
  return (
    <div className="d-lg-none text-center text-danger p-2">
      <br />
      The map is made for desktop devices.
      <br />
      Please increase your screen size to use the map.
    </div>
  )
}
        