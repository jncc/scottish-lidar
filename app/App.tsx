
import * as React from 'react'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { throttle } from 'lodash'

import { initialState, reducer } from './state'
import { Routing } from './Routing'
import { loadAndParseCollections } from './collections'
import { saveState, loadState } from './session'

let reduxStore = createStore(reducer, loadState())

// persist the redux app state to session storage (at most once per second)
reduxStore.subscribe(throttle(() => {
  saveState(reduxStore.getState())
}, 1000))

export const App = () => {

  let [collections, setCollections] = React.useState(initialState.collections)

  React.useEffect(() => {
    loadAndParseCollections().then(result => {
      setCollections(result)
    })
  }, [])
  
  return (
    <ReduxProvider store={reduxStore}>
      <Routing {...initialState} collections={collections} />
    </ReduxProvider>
  )
}
