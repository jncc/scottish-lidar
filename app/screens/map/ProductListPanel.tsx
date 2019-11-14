
import React from 'react'
import _ from 'lodash'
import { connect as reduxConnect } from 'react-redux'
import { motion } from 'framer-motion'

import { ProductResult } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'
import { DatasetPath } from '../../shared/DatasetPath'
import { CollectionTuple, State, DispatchProps } from '../../state'
import { SimplePager } from './SimplePager'
import { getPageNumberFromOffset, getPagerInfo } from '../../utility/pagerUtility'
import { useBasket } from '../../basket'

type Props = {
  products: ProductResult
  currentCollection: CollectionTuple | undefined
  productCountByCollection: { collectionName: string, products: number }[]
  productCountForCurrentCollection: number | undefined
}
type StateProps = State['mapScreen']

let ProductListPanelComponent = (props: Props & StateProps & DispatchProps) => {

  let [basket, toggleBasketItem] = useBasket()
  let currentResultPage = getPageNumberFromOffset(props.products.query.offset || 0)

  if (props.currentCollection) {
    return (
      <div className="panel product-list-panel">
        <div>
          <h5>
            <i className="fas fa-th text-primary mr-2" />
            {props.currentCollection.collection.metadata.title}
          </h5>
          <div className="mb-1">
            <DatasetPath dataset={props.currentCollection.path.dataset} />
          </div>
          <div className="product-list-panel-abstract mb-2">
            <i className="fas fa-info-circle text-secondary mr-2" />
            {props.currentCollection.collection.metadata.abstract}
          </div>
        </div>
        <div className="product-list-items">
          {props.products.result.length === 0 &&
          <div className="card text-white bg-secondary mt-4">
            <div className="card-body">
              <h5 className="card-title">No products found</h5>
              <div className="card-text">

                {props.productCountByCollection.every(x => x.products === 0)
                ?
                <div>
                  Try changing the box location - there are no products available here
                </div>
                :
                <div>
                  Try selecting a different dataset
                </div>
                }
                {/* <div>
                  <Button onClick={() => props.dispatch(MapActions.resetToCenter())}>
                    Reset query location
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
          }
          <motion.div initial="hidden" animate="visible" variants={animationVariants}>
            {props.products.result.map(p => <ProductListItem
              key={p.id}
              product={p}
              hovered={props.hovered}
              isInBasket={basket.items.some(item => item.id === p.id)}
              toggleBasketItem={toggleBasketItem}
            /> )}
          </motion.div>
        </div>
        <div className="mt-3">
          <SimplePager currentPage={currentResultPage} totalItems={props.productCountForCurrentCollection || 0} />
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

export const ProductListPanel = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(ProductListPanelComponent)

let animationVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}
