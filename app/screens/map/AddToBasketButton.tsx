
import * as React from 'react'
import { useCookies } from 'react-cookie'
import { Basket, BasketItem } from '../../basket/Basket'

const BASKET_COOKIE_NAME = 'basket'

type Props = {
}

export const AddToBasketButton = (props: Props) => {
  
  let [cookies, setCookie] = useCookies([BASKET_COOKIE_NAME])

  let addItem = (item: BasketItem) => {
    let cookie = cookies[BASKET_COOKIE_NAME]
    let basket: Basket = cookie || { items: [] }
    basket.items.push(item)
    setCookie(BASKET_COOKIE_NAME, basket, { path: '/' })
  }

  return (
    <div>
      <div>{JSON.stringify(cookies[BASKET_COOKIE_NAME])}</div>
      <button onClick={() => addItem({ productId: 'blah'})}>Add to basket</button>
    </div>
  )
}
