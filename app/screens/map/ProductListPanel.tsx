
import React from 'react'
import _ from 'lodash'
import { connect as reduxConnect } from 'react-redux'
import { motion } from 'framer-motion'

import { ProductResult } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'
import { DatasetPath } from '../../shared/DatasetPath'
import { CollectionTuple } from '../../state'
import { SimplePager } from './SimplePager'
import { getPageNumberFromOffset, getPagerInfo } from '../../utility/pagerUtility'

type Props = {
  products: ProductResult
  currentCollection: CollectionTuple | undefined
  productCountForCurrentCollection: number | undefined
}

let ProductListPanelComponent = (props: Props) => {

  let currentResultPage = getPageNumberFromOffset(props.products.query.offset || 0)

  if (props.currentCollection) {
    return (
      <div className="product-list-panel">
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
            <div>
              No products in this dataset matched your query. (You might need to select a different dataset?)
            </div>
          }
          <motion.div initial="hidden" animate="visible" variants={animationVariants}>
            {props.products.result.map(p =>
              <ProductListItem key={p.id} product={p} />
            )}
          </motion.div>
        </div>
        <div className="mt-3">
          {/* // <div>
          //   Showing {pagerInfo.startIndex + 1} to {pagerInfo.endIndex + 1}
          //   {' '}
          //   of {props.productCountForCurrentCollection} matching products
          //   <br />
          //   <br />
          //   <Pager pagerInfo={pagerInfo} />
          // </div> */}
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
