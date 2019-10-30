import React from 'react'

export let initialState = {
  collection: 'scotland-gov/lidar/phase-1/dsm',
  bbox:       [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
  page:       1
}

export type State = typeof initialState

/** Action-creating functions. */ 
export let Actions = {
  setCollection: (collection: string) =>
    createAction('SET_COLLECTION', { collection }
  ),
  setBbox: (bbox: [number, number, number, number]) =>
    createAction('SET_BBOX', { bbox }
  ),
  setPage: (page: number) =>
    createAction('SET_PAGE', { page }
  )
}

export type Actions = ActionsUnion<typeof Actions>

function reducer(state = initialState, a: Actions): State {
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
        bbox: a.payload.bbox
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: a.payload.page
      }
    default:
      throw new Error()
  }
}

let MapStoreContext = React.createContext({
  state: initialState,
  dispatch: (a: Actions) => {}
})

export let MapStoreProvider: React.FunctionComponent<{}> = ({ children }) => {

  let [state, dispatch] = React.useReducer(reducer, initialState)

  return <MapStoreContext.Provider value={{ state, dispatch }}>
           {children}
         </MapStoreContext.Provider>
}

export let useMapStore = () => React.useContext(MapStoreContext)

//
//
//
// https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575
//

type FunctionType = (...args: any[]) => any

type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType }

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>

export interface Action<T extends string> {
  type: T
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}
