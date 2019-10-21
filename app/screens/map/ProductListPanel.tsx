
import React from 'react'
import _ from 'lodash'

import Counter from './Counter'
import { Product } from '../../catalog/types'
import { ProductListItem } from './ProductListItem'

type Props = {
  products: Product[]
}

export const ProductListPanel = (props: Props) => {

  return (
    <div>
      {props.products.map(p => <ProductListItem key={p.id} product={p} />)}
      <hr />
      <Counter />

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
      magna aliqua. Dui accumsan sit amet nulla facilisi morbi tempus. Tincidunt id aliquet risus feugiat in ante 
      metus dictum. Velit euismod in pellentesque massa placerat duis. Lorem dolor sed viverra ipsum. Dui faucibus 
      in ornare quam viverra. Mauris augue neque gravida in. Ac tortor dignissim convallis aenean et tortor at.
      Tortor consequat id porta nibh venenatis cras sed felis. Sollicitudin tempor id eu nisl nunc. Vestibulum
      est pellentesque elit ullamcorper dignissim cras.
    </div>
  )
}
