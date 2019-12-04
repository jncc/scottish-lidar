
import * as React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State } from '../../state'
import { ProductResult } from '../../catalog/types'
import { LeafletMap } from './LeafletMap'
import { ProductListPanel } from './ProductListPanel'
import { DatasetListPanels } from './DatasetListPanels'
import { Delayed } from '../../shared/Delayed'
import { BasketSummary } from './BasketSummary'
import { MapControls } from './MapControls'
import { motion } from 'framer-motion'

type Props = {
  collections: CollectionTuple[]
  products: ProductResult
  productCountByCollection: { collectionName: string, products: number }[]
}
type StateProps = State['mapScreen']

const rightPanelAnimationVariants = {
  open: { x: 0 },
  closed: { x: '104%' }, // move right by slightly more than its width
}
const leftPanelAnimationVariants = {
  open: { x: 0 },
  closed: { x: '-104%' }, // move left by slightly more than its width
}

const MapScreenLayoutComponent = (props: Props & StateProps) => {

  let [rightPanelOpen, setRightPanelOpen] = React.useState(true)
  let [leftPanelOpen, setLeftPanelOpen] = React.useState(true)

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
    <div className="d-none d-lg-block ">
      <MapControls />
      <div className="r">
        <Delayed delayInMilliseconds={800}>
          <motion.div className="right-panel-container"
            initial="open"
            animate={rightPanelOpen ? 'open' : 'closed'}
            variants={rightPanelAnimationVariants}
          >
            {currentCollection &&
              <div className="right-panel-container-toggle" onClick={() => setRightPanelOpen(!rightPanelOpen)}>
                {rightPanelOpen
                  ? <i className="fas fa-chevron-right fa-xs"/>
                  : <i className="fas fa-chevron-left fa-xs"/>
                }
              </div>
            }
            <ProductListPanel
              products={props.products}
              currentCollection={currentCollection}
              productCountByCollection={props.productCountByCollection}
              productCountForCurrentCollection={productCountForCurrentCollection}
            />
            <BasketSummary />
          </motion.div>
        </Delayed>        
        <Delayed delayInMilliseconds={800}>
          <motion.div className="left-panel-container"
            initial="open"
            animate={leftPanelOpen ? 'open' : 'closed'}
            variants={leftPanelAnimationVariants}
          >
            {currentCollection &&
              <div className="left-panel-container-toggle" onClick={() => setLeftPanelOpen(!leftPanelOpen)}>
                {leftPanelOpen
                  ? <i className="fas fa-chevron-left fa-xs"/>
                  : <i className="fas fa-chevron-right fa-xs"/>
                }
              </div>
            }
            <DatasetListPanels
              collections={props.collections}
              productCountByCollection={props.productCountByCollection}
            />
          </motion.div>        
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
    <div className="d-lg-none text-center text-danger p-2 mb-4">
      <br />
      The map is made for desktop devices.
      <br />
      Please increase your screen size and ensure your browser zoom level is set to normal.
    </div>
  )
}

export const MapScreenLayout = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(MapScreenLayoutComponent)
