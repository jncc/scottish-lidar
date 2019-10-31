
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'

import { initialState } from './state'
import { Routing } from './Routing'
import { loadAndParseCollections } from './collections'

export const App = () => {

  let [collections, setCollections] = React.useState(initialState.collections)

  React.useEffect(() => {
    loadAndParseCollections().then(result => {
      setCollections(result)
    })
  }, [])
  
  return (
    <CookiesProvider>
      <Routing {...initialState} collections={collections} />
    </CookiesProvider>
  )
}
