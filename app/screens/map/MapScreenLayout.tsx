
import * as React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State } from '../../state'
import { ProductResult } from '../../catalog/types'
import { LeafletMap } from './LeafletMap'
import { ProductListPanel } from './ProductListPanel'
import { DatasetListPanels } from './DatasetListPanels'
import { Delayed } from '../../shared/Delayed'

type Props = {
  collections: CollectionTuple[]
  products: ProductResult
  productCountByCollection: { collectionName: string, products: number }[]
}

type StateProps = State['mapScreen']

const MapScreenLayoutComponent = (props: Props & StateProps) => {

  let currentCollection = props.collections
    .find(c => c.collection.name === props.collection)

  let productCountForCurrentCollection = props.productCountByCollection
    .filter(x => x.collectionName === props.collection)
    .map(x => x.products)
    .find(() => true)

  let wmsLayer = currentCollection && currentCollection.ogcProduct
    ? currentCollection!.ogcProduct!.data!.product!.wms
    : undefined
  
  return <>
    {makeSmallScreenWarningUI()}
    <div className="d-none d-lg-block">
      {/* <div className="bottom-left-control-group d-lg">
        Bottom left controls
      </div> */}
      <div className="bottom-right-control-group">
        Bottom right controls
      </div>
      <div className="r">
        <Delayed delayInMilliseconds={800}>
          <div className="right-panel-container">

            <div className="panel">
              <ProductListPanel
                products={props.products}
                currentCollection={currentCollection}
                productCountForCurrentCollection={productCountForCurrentCollection}
              />
            </div>
            <div className="panel">
              Hello hello
            </div>
          </div>
        </Delayed>        
        <Delayed delayInMilliseconds={800}>
          <div className="left-panel-container">
            <DatasetListPanels
              collections={props.collections}
              productCountByCollection={props.productCountByCollection}
            />
          </div>        
        </Delayed>
      </div>
      <LeafletMap
        products={props.products.result}
        wmsLayer={wmsLayer}
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

export const MapScreenLayout = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(MapScreenLayoutComponent)
