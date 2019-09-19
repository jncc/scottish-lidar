
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'

import { initialState, State } from './state'
import { Routing } from './Routing'
import { parseCollectionName } from './utility/collectionUtility'
import { loadOgcProducts, loadCollections } from './catalog/api'

export class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props)
    this.state = initialState
  }

  async componentDidMount() {
    this.doLoadCollections()
  }

  render() {
    return (
      <CookiesProvider>
        <Routing {...this.state} />
      </CookiesProvider>
    )
  }

  async doLoadCollections() {
    this.setState((prev) => ({ loading: prev.loading + 1 }))
    try {
      let [collections, ogcProducts] = await Promise.all([
        loadCollections(),
        loadOgcProducts()
      ])

      let tuples = collections.result
        // discard the "OGC" collection which only exists to catalogue the OGC WMS products
        // (this is just how the catalog data has been structured)
        .filter(c => !c.name.endsWith('/ogc'))
        // create a tuple of { collection, its parsed collection name, its OGC product }
        .map(c => {
          // each collection has a corresponding OGC product
          // `scotland-gov/lidar/phase-1/dtm` (collection name)
          // `scotland-gov-lidar-phase-1-dtm` (OGC product name)
          let ogcProductName = c.name.replace(new RegExp('\/', 'g'), '-')
          return {
            collection: c,
            name: parseCollectionName(c.name),
            ogcProduct: ogcProducts.result.find(p => p.name === ogcProductName)
          }
        })
      this.setState({ collections: tuples })
    }
    finally {
      this.setState((prev) => ({ loading: prev.loading - 1 }))
    }
  }
}
