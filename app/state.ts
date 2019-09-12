import { Collection, Product } from './catalog/types'
import { ParsedCollectionName } from './utility/collectionUtility'

export let initialState = {
  /** The number of in-progress network requests. */
  loading    : 0,
  /** The set of collections, stored once for use throughout the app.
   *  It's convenient to store pairs of { Collection, ParsedCollectionName } */
  collections: [] as {
    collection: Collection,
    name: ParsedCollectionName,
    ogcProduct?: Product
  }[],
  /** The state for the Mapper component. */
  mapper     : {
    collection: ''
  }
}

export type State = typeof initialState
