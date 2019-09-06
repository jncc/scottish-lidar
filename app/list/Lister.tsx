
import * as React from 'react'

interface ListerState {
}

export class Lister extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = { collections: [], pending: 0 }
  }
  
  render() {
    let collectionsList: any = null
    if (this.state.collections) {
      collectionsList = this.state.collections.map((c: any) => {
        return (
          <li key={c.id}>
            {JSON.stringify(c)}
          </li>
        )
      })
    }

    return (
      <div>
        <h1>List of collections!!</h1>
        <ul>
          {collectionsList}
        </ul>
      </div>
    )
  }
  
  componentDidMount() {
    this.fetchCollections()
  }

  fetchCollections() {
    this.setState((prev: any) => ({ pending: prev.pending + 1 }))
    fetch('http://localhost:6080/search/collection/scotland-gov/*')
    .then(res => res.json()
    .then((r: any) => {
        console.log(r.result)
          this.setState({ collections: r.result })
          this.setState((prev: any) => ({ pending: prev.pending - 1 }))
        })).catch(ex => {
          // tslint:disable-next-line: no-console
          console.log(`couldn't get data`, ex)
          this.setState((prev: any) => ({ pending: prev.pending - 1 }))
        })
  }
}
