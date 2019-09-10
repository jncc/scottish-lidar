
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'

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
        this.setState({ collections: r.result })
      })
      .finally(() => {
        this.setState((prev) => ({ loading: prev.loading - 1 }))
      })
  }
}
