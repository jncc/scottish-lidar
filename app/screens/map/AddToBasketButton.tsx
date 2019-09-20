
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

import { useBasket } from '../../basket'

type Props = {
}

export const AddToBasketButton = (props: Props) => {
  
  let [count, setCount] = useState(0)
  let [basket, addItemToBasket] = useBasket()

  return (
    <div>
      <pre>{JSON.stringify(basket)}</pre>
      <div>{count}</div>
      <Button  variant="light"onClick={() => setCount(count + 1)}>Increment</Button>
      <Button variant="primary" onClick={() => addItemToBasket({ productId: 'product' + count })}>Add to basket</Button>
    </div>
  )
}
