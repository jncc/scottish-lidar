
import { useCookies } from 'react-cookie'

export type Basket = {
  items: BasketItem[]
}

export type BasketItem = {
  id   : string
  name : string
  title: string
  url  : string
  type : string
  size : number
}

const COOKIE_NAME = 'basket'

/**
 * The basket is not stored as application state, but serialized
 * in a cookie so that it persists. This custom hook exposes a nice
 * API for accessing the basket.
 */
export function useBasket() {
  // console.log('In useBasket...')

  let [cookies, setCookie] = useCookies([COOKIE_NAME])
  let cookie = cookies[COOKIE_NAME]
  
  let basket: Basket = cookie || { items: [] }

  const toggleItem = (item: BasketItem) => {

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

  const removeAll = () => {
    // console.log('removing all...')
    basket = { items: [] }
    setCookie(COOKIE_NAME, basket, { path: '/' })
    // console.log(basket)
  }

  // const getBasket = () => {
  //   return cookie || { items: [] }
  // }

  return [basket, toggleItem, removeAll] as [typeof basket, typeof toggleItem, typeof removeAll]
}

// export const Basket2 = {
//   toggleItem = (item: BasketItem, ) => {

//     let existingItem = basket.items.find(x => x.id === item.id)
    
//     if (existingItem) {
//       // remove item (thanks, javascript)
//       let indexOfExistingItem = basket.items.indexOf(existingItem)
//       basket.items.splice(indexOfExistingItem, 1)
//     } else {
//       // add item
//       basket.items.push(item)
//     }

//     setCookie(COOKIE_NAME, basket, { path: '/' })

//     // return whether we added or removed the item
//     return existingItem ? 'removed' : 'added'
//   }

//   const removeAll = () => {
//     // console.log('removing all...')
//     basket = { items: [] }
//     setCookie(COOKIE_NAME, basket, { path: '/' })
//     // console.log(basket)
//   }

// }
