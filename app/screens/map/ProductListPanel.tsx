
import React from 'react'
import _ from 'lodash'

import { ProductResult, Product } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'
import { DatasetPath } from '../../shared/DatasetPath'
import { CollectionTuple } from '../../state'
import { Pager } from '../../shared/Pager'
import { Pagination } from 'react-bootstrap'

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

  if (props.collection) {
    return (
      <div className="product-list-panel">
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
            No products in this dataset matched your query. 
          </div>
          <div>
            Perhaps select a different dataset.
          </div>
        </div>
        }

        <hr />
        {props.products.result.map(p => <ProductListItem
          key={p.id}
          product={p}
          hovered={props.hoveredProduct === p}
          productHovered={props.productHovered}
          productUnhovered={props.productUnhovered}
        />)}
        <hr />
        {props.productCountForCurrentCollection &&
        <div>
          Showing {props.products.result.length} of {props.productCountForCurrentCollection} matching products
          {/* Actually want: Showing 11 to 20 of 36 matching products */}
          <Pager
            offset={props.products.query.offset || 1}
            total={props.productCountForCurrentCollection}
            setPage={props.setPage}
            />

<Pagination size="sm">
  <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next />
  <Pagination.Last />
</Pagination>            
        </div>
        }
      </div>
    )
  }
  else {
    return null
  }
}
