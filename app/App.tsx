
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
// import reduxThunk, { ThunkMiddleware } from 'redux-thunk'

import { initialState, reducer } from './state'
import { Routing } from './Routing'
import { loadAndParseCollections } from './collections'
import { saveState, loadState } from './session'
import { throttle } from 'lodash'

let reduxStore = createStore(reducer, loadState())
// let reduxStore = createStore(reducer, applyMiddleware(reduxThunk as ThunkMiddleware<State, Actions>))

// persist the app state to session storage (at most once per second)
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
    <CookiesProvider>
      <ReduxProvider store={reduxStore}>
        <Routing {...initialState} collections={collections} />
      </ReduxProvider>
    </CookiesProvider>
  )
}
