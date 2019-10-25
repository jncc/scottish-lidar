
import React from 'react'
import _ from 'lodash'

import Counter from './Counter'
import { Product } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'
import { DatasetPath } from '../../shared/DatasetPath'
import { CollectionTuple } from '../../state'

type Props = {
  products: Product[]
  collection: CollectionTuple | undefined
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
        {props.products.map(p => <ProductListItem key={p.id} product={p} />)}
      </div>
    )
  }
  else {
    return null
  }
}
