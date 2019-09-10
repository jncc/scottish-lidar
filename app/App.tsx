
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'
// import partition from 'lodash/partition'

import { initialState, State } from './state'
import { loadCollections } from './catalog'
import { Routing } from './Routing'

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
        // discard the "OGC" collection that only exists to contain the WMS products
        // (this is just how the catalog data has been structured)
        let collections = r.result.filter(c => !c.name.endsWith('/ogc'))
        this.setState({ collections: collections })
      })
      .finally(() => {
        this.setState((prev) => ({ loading: prev.loading - 1 }))
      })
  }
}
