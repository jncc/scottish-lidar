
/** Load and save redux state from sessionStorage. */

import { State } from './state'

export const loadState = () => {
  try {
    let serialisedState = sessionStorage.getItem('state')
    if (serialisedState === null) {
      return undefined
    } else {
      return JSON.parse(serialisedState)
    }
  } catch (error) {
    // swallow error and let redux use the default state
    return undefined
  }
}

export const saveState = (state: State) => {
  try {
    let serialisedState = JSON.stringify(state)
    sessionStorage.setItem('state', serialisedState)
  } catch (error) {
    // swallow error and fall back to memory-only state
  }
}
