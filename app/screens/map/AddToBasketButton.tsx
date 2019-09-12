
import React, { useState } from 'react'
import { useBasket, Basket, BasketItem } from '../../basket/Basket'

type Props = {
}

export const AddToBasketButton = (props: Props) => {
  
  let [count, setCount] = useState(0)
  let [basket, addItemToBasket] = useBasket()

  return (
    <div>
      <pre>{JSON.stringify(basket)}</pre>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => addItemToBasket({ productId: 'product' + count })}>Add to basket</button>
    </div>
  )
}
