import { Collection } from './catalog'

export let initialState = {
  loading    : 0,
  collections: [] as Collection[]
}

export type State = typeof initialState
