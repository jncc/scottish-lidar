
import React from 'react'
import _ from 'lodash'
import { connect as reduxConnect } from 'react-redux'
import { motion } from 'framer-motion'

import { ProductResult } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'
import { DatasetPath } from '../../shared/DatasetPath'
import { CollectionTuple, State, DispatchProps, AppActions } from '../../state'
import { SimplePager } from './SimplePager'
import { getPageNumberFromOffset } from '../../utility/pagerUtility'
import { DatasetModal } from '../../shared/DatasetModal'
import { makeBasketItemFromProduct } from '../../basket'

type Props = {
  products: ProductResult
  currentCollection: CollectionTuple | undefined
  productCountByCollection: { collectionName: string, products: number }[]
  productCountForCurrentCollection: number | undefined
}

let ProductListPanelComponent = (props: Props & State & DispatchProps) => {
  
  let [infoModalOpen, setInfoModalOpen] = React.useState(false)
  
  let currentResultPage = getPageNumberFromOffset(props.products.query.offset || 0)
  let entireCurrentResultPageIsInBasket = props.products.result.every(p => props.basket.some(x => x.id === p.id))
  
  let addAll = () => {props.dispatch(AppActions.addAll(
    props.products.result.map(p => makeBasketItemFromProduct(p))
  ))}

  if (props.currentCollection) {
    return (
      <div className="panel product-list-panel">
        <div>
          <h5>
            <i className="fas fa-th text-primary mr-2" aria-hidden="true" />
            {props.currentCollection.collection.metadata.title}
          </h5>
          <div className="mb-1">
            <DatasetPath dataset={props.currentCollection.path.dataset} />
          </div>
          <div className="product-list-panel-abstract">
            <span className="hoverable-little-icon mr-2" onClick={() => setInfoModalOpen(true)}>
              <i className="fas fa-info-circle" aria-hidden="true" />
            </span>
            <DatasetModal
              show={infoModalOpen}
              onHide={() => setInfoModalOpen(false)}
              collection={props.currentCollection.collection}
              path={props.currentCollection.path}
            />
            {props.currentCollection.collection.metadata.abstract}
          </div>
        </div>
        <div className="product-list-items">
          {props.products.result.length === 0 &&
          <div className="card text-white bg-primary mt-4">
            <div className="card-body">
              <h5 className="card-title">No products found here</h5>
              <div className="card-text">

                {props.productCountByCollection.every(x => x.products === 0)
                ?
                <div>
                  Try moving the bounding box - there are no products available here
                </div>
                :
                <ul>
                  <li>Select a different dataset</li>
                  <li>Move the bounding box</li>
                </ul>
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
              hovered={props.mapScreen.hovered}
              isInBasket={props.basket.some(item => item.id === p.id)}
              toggleBasketItem={(item) => props.dispatch(AppActions.toggleItem(item))}
            /> )}
          </motion.div>
        </div>
        <div className="text-right add-all-to-basket">
          <div
            className={entireCurrentResultPageIsInBasket ? ' add-all-to-basket-disabled' : ''}
            tabIndex={0}
            onClick={addAll}
            onKeyPress={addAll}>
              Add all <i className="fas fa-angle-up" aria-hidden="true" />
          </div>
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
  (s: State): State => {
    return s
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
