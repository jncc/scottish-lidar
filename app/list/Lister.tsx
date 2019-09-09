
import * as React from 'react'

import { getCollections, Collection } from '../catalog'

interface ListerState {
  collections: Collection[]
  pending: number
}

export class Lister extends React.Component<any, ListerState> {

  constructor(props: any) {
    super(props)
    this.state = {
      collections: [] as Collection[],
      pending: 0
    }
  }
  
  render() {

    let collectionsListUI = this.state.collections.map((c) => {
      return (
        <li key={c.id}>
          <div>{c.metadata.title}</div>
          <div>{c.name}</div>
          <div>{c.metadata.abstract}</div>
        </li>
      )
    })

    return (
      <div>
        <h1>List of collections!!</h1>
        <ul>
          {collectionsListUI}
        </ul>
      </div>
    )
  }
  
  componentDidMount() {
    this.loadCollections()
  }

  loadCollections() {
    this.setState((prev: any) => ({ pending: prev.pending + 1 }))
    getCollections()
      .then(r => {
        this.setState({ collections: r.result })
      })
      .finally(() => {
        this.setState((prev: any) => ({ pending: prev.pending - 1 }))
      })
  }
}
