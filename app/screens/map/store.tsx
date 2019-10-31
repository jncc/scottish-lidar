import React from 'react'
import { ProductResult, Product } from '../../catalog/types'
import { bboxToWkt } from '../../utility/geospatialUtility'
import { config } from './config'
import { createAction, ActionsUnion } from '../../utility/reducerUtility'

export let defaultMapState = {
  collection: 'scotland-gov/lidar/phase-1/dsm',
  bbox:       [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
  page:       1,
  hovered:    undefined as unknown as Product | undefined
  // products:   {
  //   query: {
  //     collections: config.defaultQuery.collections,
  //     footprint: bboxToWkt(config.defaultQuery.bbox),
  //     spatialop: 'overlaps'
  //   },
  //   result: []
  // } as ProductResult
}

export type MapState = typeof defaultMapState

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

function reducer(state = defaultMapState, a: MapAction): MapState {
  switch (a.type) {
    case 'SET_COLLECTION':
      return {
        ...state,
        collection: a.payload.collection,
        page: 1 // reset paging whenever collection changes
      }
    case 'SET_BBOX':
      return {
        ...state,
        bbox: a.payload.bbox,
        page: 1 // reset paging whenever bbox changes
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: a.payload.page
      }
    case 'PRODUCT_HOVERED':
      return {
        ...state,
        hovered: a.payload.product
      }
    case 'PRODUCT_UNHOVERED':
      // only unset the hovered product if the product is currently hovered
      if (state.hovered === a.payload.product) {
        return {
          ...state,
          hovered: undefined
        }
      } else {
        return state
      }
    default:
      throw new Error()
  }
}

let MapStoreContext = React.createContext({
  state: defaultMapState,
  dispatch: (a: MapAction) => {}
})

export let MapStoreProvider: React.FunctionComponent<{}> = ({ children }) => {

  let [state, dispatch] = React.useReducer(reducer, defaultMapState)

  return <MapStoreContext.Provider value={{ state, dispatch }}>
           {children}
         </MapStoreContext.Provider>
}

export let useMapStore = () => React.useContext(MapStoreContext)
