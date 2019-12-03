
import { Product } from './catalog/types'

export type BasketItem = {
  id   : string
  name : string
  title: string
  url  : string
  type : string
  size : number
}

export const makeBasketItemFromProduct = (p: Product): BasketItem => {
  return {
    id: p.id,
    name: p.name,
    title: p.metadata.title,
    url: p.data.product!.http!.url,
    type: p.data.product!.http!.type!,
    size: p.data.product!.http!.size!,
  }  
}
