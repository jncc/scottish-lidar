
/**
 * The global application state's initial values, and types thereof.
 */

import { Dispatch } from 'redux'
import _ from 'lodash'

import { Collection, Product } from './catalog/types'
import { ParsedCollectionPath } from './utility/collectionUtility'
import { createAction, ActionsUnion } from './utility/reducerUtility'
import { config } from './screens/map/config'
import { BasketItem } from './basket'

/** The type of a React props object containing a Redux dispatch function. */
export type DispatchProps = { dispatch: Dispatch }

export let initialState = {
  /** The set of collections, stored once for use throughout the app.
   *  It's convenient to store tuples of { collection, parsed path, OGC product  } */
  collections: [] as {
    collection: Collection,
    path: ParsedCollectionPath,
    ogcProduct?: Product
  }[],
  /** The shopping basket */
  basket: [] as BasketItem[],
  /** The state for the map screen. */
  mapScreen: {
    collection: 'scotland-gov/lidar/phase-1/dsm',
    bbox:       [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
    page:       1,
    hovered:    undefined as unknown as Product | undefined,
    leaflet:    {
      zoom: config.defaultZoom,
      center: config.defaultCenter,
      redraw: 0,
    },
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

export let AppActions = {
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
  leafletZoomIn: () =>
    createAction('LEAFLET_ZOOM_IN'),
  leafletZoomOut: () =>
    createAction('LEAFLET_ZOOM_OUT'),
  leafletZoomChanged: (zoom: number) =>
    createAction('LEAFLET_ZOOM_CHANGED', { zoom }
  ),
  leafletCenterChanged: (center: [number, number]) =>
    createAction('LEAFLET_CENTER_CHANGED', { center }
  ),
  resetToCenter: () =>
    createAction('RESET_TO_CENTER'),
  toggleItem: (item: BasketItem) =>
    createAction('TOGGLE_ITEM', { item }
  ),
  removeAll: () =>
    createAction('REMOVE_ALL'),
  addAll: (items: BasketItem[]) =>
    createAction('ADD_ALL', { items }
  ),
}

export type AppAction = ActionsUnion<typeof AppActions>

export function reducer(state = initialState, a: AppAction): State {
  switch (a.type) {
    case 'SET_COLLECTION': {
      return {
        ...state,
        mapScreen: {
          ...state.mapScreen,
          collection: a.payload.collection,
          page: 1 // reset paging whenever collection changes
        }
      }
    }
    case 'SET_BBOX': {
      return {
        ...state,
        mapScreen:{
          ...state.mapScreen,
          bbox: a.payload.bbox,
          page: 1 // reset paging whenever bbox changes
        }
      }
    }
    case 'SET_PAGE': {
      return {
        ...state,
        mapScreen: {
          ...state.mapScreen,
          page: a.payload.page
        }
      }
    }
    case 'RESET_TO_CENTER': {
      return {
        ...state,
        mapScreen: {
          // reset everything to default, apart from the current collection,
          // and increment the redraw number so that dependent effect hook can re-run
          ...initialState.mapScreen,
          collection: state.mapScreen.collection,
          leaflet: {
            ...initialState.mapScreen.leaflet,
            redraw: state.mapScreen.leaflet.redraw + 1
          }
        }
      }
    }
    case 'PRODUCT_HOVERED': {
      return {
        ...state,
        mapScreen: {
          ...state.mapScreen,
          hovered: a.payload.product
        }
      }
    }
    case 'PRODUCT_UNHOVERED': {
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
    }
    case 'LEAFLET_ZOOM_IN': {
      return {
        ...state,
        mapScreen:{
          ...state.mapScreen,
          leaflet: {
            ...state.mapScreen.leaflet,
            zoom: Math.min(state.mapScreen.leaflet.zoom + 1, config.maximumZoom)
          }
        }
      }
    }
    case 'LEAFLET_ZOOM_OUT': {
      return {
        ...state,
        mapScreen:{
          ...state.mapScreen,
          leaflet: {
            ...state.mapScreen.leaflet,
            zoom: Math.max(state.mapScreen.leaflet.zoom - 1, 0)
          }
        }
      }
    }
    case 'LEAFLET_ZOOM_CHANGED': {
      return {
        ...state,
        mapScreen:{
          ...state.mapScreen,
          leaflet: { ...state.mapScreen.leaflet, zoom: a.payload.zoom }
        }
      }
    }
    case 'LEAFLET_CENTER_CHANGED': {
      return {
        ...state,
        mapScreen:{
          ...state.mapScreen,
          leaflet: { ...state.mapScreen.leaflet, center: a.payload.center }
        }
      }
    }
    case 'TOGGLE_ITEM': {
      let existingItem = state.basket.find(x => x.id === a.payload.item.id)
      let basket = existingItem
        ? state.basket.filter(item => item.id !== a.payload.item.id)
        : [...state.basket.filter(item => item.id !== a.payload.item.id), a.payload.item]
      return {
        ...state,
        basket: basket.length <= 1000 ? basket : state.basket
      }
    }
    case 'REMOVE_ALL': {
      return {
        ...state,
        basket: []
      }
    }
    case 'ADD_ALL': {
      let basket = _([...state.basket, ...a.payload.items]).uniqBy(item => item.id).value()
      return {
        ...state,
        basket: basket.length <= 1000 ? basket : state.basket
      }
    }
    default:
      return state
  }
}

// export let BasketActions = {
// }

// export type BasketAction = ActionsUnion<typeof BasketActions>

// export function basketReducer(state = initialState, a: BasketAction): State {
//   switch (a.type) {
//     default:
//       return state
//   }
// }
