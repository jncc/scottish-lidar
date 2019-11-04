
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createStore, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
// import reduxThunk, { ThunkMiddleware } from 'redux-thunk'

import { initialState, reducer } from './state'
import { Routing } from './Routing'
import { loadAndParseCollections } from './collections'

let reduxStore = createStore(reducer)
// let reduxStore = createStore(reducer, applyMiddleware(reduxThunk as ThunkMiddleware<State, Actions>))

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
