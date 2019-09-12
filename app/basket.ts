
import { useCookies } from 'react-cookie'

export type Basket = {
  items: BasketItem[]
}

export type BasketItem = {
  productId: string
}

const COOKIE_NAME = 'basket'

export function useBasket() {

  let [cookies, setCookie] = useCookies([COOKIE_NAME])

  let cookie = cookies[COOKIE_NAME]
  let basket: Basket = cookie || { items: [] }

  let addItem = (item: BasketItem) => {
    basket.items.push(item)
    setCookie(COOKIE_NAME, basket, { path: '/' })
  }

  return [basket, addItem] as [typeof basket, typeof addItem]
}
