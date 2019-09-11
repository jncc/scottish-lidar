
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'

import { initialState, State } from './state'
import { loadCollections } from './catalog'
import { Routing } from './Routing'
import { parseCollectionName } from './utility/collectionUtility'

export class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.loadCollections()
  }

  render() {
    return (
      <CookiesProvider>
        <Routing {...this.state} />
      </CookiesProvider>
    )
  }

  loadCollections() {
    this.setState((prev) => ({ loading: prev.loading + 1 }))
    loadCollections()
      .then(r => {
        let collections = r.result
          // discard the "OGC" collection that only exists to contain the WMS products
          // (this is just how the catalog data has been structured)
          .filter(c => !c.name.endsWith('/ogc'))
          .map(c => ({
            collection: c,
            name: parseCollectionName(c.name)
          }))
        this.setState({ collections })
      })
      .finally(() => {
        this.setState((prev) => ({ loading: prev.loading - 1 }))
      })
  }
}
