
import React from 'react'
import { Product } from '../../catalog/types'

type Props = { 
  product: Product
  hovered: boolean
  productHovered: (p: Product) => void
  productUnhovered: (p: Product) => void
}

export const ProductListItem = (props: Props) => {

  return (
    <div
      className="product-list-item"
      onMouseOver={() => props.productHovered(props.product)}
      onMouseOut={() => props.productUnhovered(props.product)}
    >
      <div>
        {props.product.data.product.title}
      </div>
      <div>
        add
      </div>
      {props.hovered &&
      <div>
        !
      </div>
      }
      {/* {props.product.data.product!.http!.size}
      {props.product.data.product!.http!.type}
      {props.product.data.product!.http!.url} */}
    </div>
  )
}
