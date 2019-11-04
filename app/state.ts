
/**
 * The global application state's initial values, and types thereof.
 * Note that the application also stores appropriate state in:
 * - the list screen URL querystring
 * - the basket cookie.
 */

import { Collection, Product } from './catalog/types'
import { ParsedCollectionPath } from './utility/collectionUtility'
import { createAction, ActionsUnion } from './utility/reducerUtility'

export let initialState = {
  /** The number of in-progress network requests. */
  loading    : 0,
  /** The set of collections, stored once for use throughout the app.
   *  It's convenient to store tuples of { collection, parsed path, OGC product  } */
  collections: [] as {
    collection: Collection,
    path: ParsedCollectionPath,
    ogcProduct?: Product
  }[],
  /** The state for the map screen. */
  mapScreen: {
    collection: 'scotland-gov/lidar/phase-1/dsm',
    bbox:       [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
    page:       1,
    hovered:    undefined as unknown as Product | undefined,
    // products:   {
    //   query: {
    //     collections: [] as string[], //config.defaultQuery.collections,
    //     footprint: '', // bboxToWkt(config.defaultQuery.bbox),
    //     spatialop: 'overlaps'
    //   },
    //   result: []
    // } as ProductResult
  }
}

export type State = typeof initialState
export type CollectionTuple = State['collections'][0] // named typed for convenience

export let MapActions = {
  setCollection: (collection: string) =>
    createAction('SET_COLLECTION', { collection }
  ),
  setBbox: (bbox: [number, number, number, number]) =>
    createAction('SET_BBOX', { bbox }
  ),
  setPage: (page: number) =>
    createAction('SET_PAGE', { page }
  ),
  productHovered: (product: Product) =>
    createAction('PRODUCT_HOVERED', { product }
  ),
  productUnhovered: (product: Product) =>
    createAction('PRODUCT_UNHOVERED', { product }
  ),
}

export type MapAction = ActionsUnion<typeof MapActions>

export function reducer(state = initialState, a: MapAction): State {
  switch (a.type) {
    case 'SET_COLLECTION':
      return {
        ...state,
        mapScreen: {
          ...state.mapScreen,
          collection: a.payload.collection,
          page: 1 // reset paging whenever collection changes
        }
      }
    case 'SET_BBOX':
      return {
        ...state,
        mapScreen:{
          ...state.mapScreen,
          bbox: a.payload.bbox,
          page: 1 // reset paging whenever bbox changes
        }
      }
    case 'SET_PAGE':
      return {
        ...state,
        mapScreen: {
          ...state.mapScreen,
          page: a.payload.page
        }
      }
    case 'PRODUCT_HOVERED':
      return {
        ...state,
        mapScreen: {
          ...state.mapScreen,
          hovered: a.payload.product
        }
      }
    case 'PRODUCT_UNHOVERED':
      // only unset the hovered product if it's this product that's currently hovered
      if (state.mapScreen.hovered === a.payload.product) {
        return {
          ...state,
          mapScreen: {
            ...state.mapScreen,
            hovered: undefined
          }
        }
      } else {
        return state
      }
    default:
      return state
  }
}
