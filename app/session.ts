
/** Load and save redux state from sessionStorage. */

import { State } from './state'

export const loadState = () => {
  try {
    let serialisedState = sessionStorage.getItem('state')
    if (serialisedState === null) {
      return undefined
    } else {
      let deserialised = JSON.parse(serialisedState)
      return deserialised // ensureDefaults(deserialised)
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

// todo return State
// let ensureDefaults = (deserialised: any): any => {
//   // as properties are added, they will not be in session state of prior users
//   // so we need to ensure that every property in initialState is present in the deserialialised state
//   iterate(deserialised)
//   return deserialised
// }

// let iterate = (o: any) => {
//   Object.keys(o).forEach(key => {

//     console.log(`key: ${key}, value: ${o[key]}`)
//     console.log(o[key])

//     if (typeof o[key] === 'object') {
//         iterate(o[key])
//     }
//     if (o[key] === undefined)
//   })
// }
