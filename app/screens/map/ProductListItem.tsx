
import React from 'react'
import { Product } from '../../catalog/types'

type Props = { 
  product: Product
}

export const ProductListItem = (props: Props) => {

  return (
    <div className="product-list-item">
      <div>
        {props.product.data.product.title}
      </div>
      <div>
        <i className="fas fa-info-circle" />
      </div>
      {/* {props.product.data.product!.http!.size}
      {props.product.data.product!.http!.type}
      {props.product.data.product!.http!.url} */}
    </div>
  )
}
