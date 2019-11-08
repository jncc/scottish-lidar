
import { useCookies } from 'react-cookie'

export type Basket = {
  items: BasketItem[]
}

export type BasketItem = {
  id  : string
  name: string
  url : string
  type: string
  size: number
}

const COOKIE_NAME = 'basket'

// This is very mutable, and reassignable...
let basket: Basket = { items: [] }

/**
 * The basket is not stored as application state, but serialized
 * in a cookie so that it persists. This custom hook exposes a nice
 * API for accessing the basket.
 */
export function useBasket() {

  let [cookies, setCookie] = useCookies([COOKIE_NAME])
  let cookie = cookies[COOKIE_NAME]

  basket = cookie || { items: [] }

  let toggleItem = (item: BasketItem) => {

    let existingItem = basket.items.find(x => x.id === item.id)
    
    if (existingItem) {
      // remove item (thanks, javascript)
      let indexOfExistingItem = basket.items.indexOf(existingItem)
      basket.items.splice(indexOfExistingItem, 1)
    } else {
      // add item
      basket.items.push(item)
    }

    setCookie(COOKIE_NAME, basket, { path: '/' })

    // return whether we added or removed the item
    return existingItem ? 'removed' : 'added'
  }

  let removeAll = () => {
    // console.log('removing all...')
    basket = { items: [] }
    // console.log(basket)
  }

  return [basket, toggleItem, removeAll] as [typeof basket, typeof toggleItem, typeof removeAll]
}
