
/**
 * The global application state's initial values, and types thereof.
 * Note that the application also stores appropriate state in:
 * - the list screen URL querystring
 * - the basket cookie.
 */

import { Collection, Product } from './catalog/types'
import { ParsedCollectionPath } from './utility/collectionUtility'

export let initialState = {
  /** The number of in-progress network requests. */
  loading    : 0,
  /** The set of collections, stored once for use throughout the app.
   *  It's convenient to store tuples of { collection + parsed name + OGC product,  } */
  collections: [] as {
    collection: Collection,
    path: ParsedCollectionPath,
    ogcProduct?: Product
  }[],
}

export type State = typeof initialState
export type CollectionTuple = State['collections'][0] // named typed for convenience
