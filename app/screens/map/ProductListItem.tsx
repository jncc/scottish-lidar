
import React from 'react'
import { Product } from '../../catalog/types'

type Props = { 
  product: Product
}

export const ProductListItem = (props: Props) => {

  return (
    <div>
      {props.product.name}
    </div>
  )
}
