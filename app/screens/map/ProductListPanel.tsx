
import React from 'react'
import _ from 'lodash'

import { ProductResult, Product } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'
import { DatasetPath } from '../../shared/DatasetPath'
import { CollectionTuple } from '../../state'
import { Pager } from '../../shared/Pager'
import { getPagerInfo, getPageNumberFromOffset } from '../../utility/pagerUtility'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  products: ProductResult
  collection: CollectionTuple | undefined
  productCountForCurrentCollection: number | undefined
  setPage: (n: number) => void
  hoveredProduct?: Product
  productHovered: (p: Product) => void
  productUnhovered: (p: Product) => void
}

export const ProductListPanel = (props: Props) => {
  let currentPage = getPageNumberFromOffset(props.products.query.offset || 0)
  let pagerInfo = getPagerInfo(currentPage, props.productCountForCurrentCollection || 0)

  if (props.collection) {
    return (
      <div className="product-list-panel">
        <div className="">
          <h5>
            <i className="fas fa-th text-primary mr-2" />
            {props.collection.collection.metadata.title}
          </h5>
          <div className="mb-2">
            <DatasetPath dataset={props.collection.path.dataset} />
          </div>
          
          <div className="product-list-panel-abstract">
            <i className="fas fa-info-circle text-secondary mr-2" />
            {props.collection.collection.metadata.abstract}
          </div>

          {props.products.result.length === 0 &&
          <div>
            <div>
              No products in this dataset matched your query. (You might need to select a different dataset?)
            </div>
          </div>
          }
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="product-list-items"
        >
          {props.products.result.map(p => <ProductListItem
            key={p.id}
            product={p}
            hovered={props.hoveredProduct === p}
            productHovered={props.productHovered}
            productUnhovered={props.productUnhovered}
          />)}

        </motion.div>
        <div>
          <hr />
          {props.productCountForCurrentCollection &&
          <div>

            Showing {pagerInfo.startIndex + 1} to {pagerInfo.endIndex + 1}
            {' '}
            of {props.productCountForCurrentCollection} matching products
            <br />
            <br />
            <Pager
              pagerInfo={pagerInfo}
              setPage={props.setPage}
            />
          </div>
          }
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

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
