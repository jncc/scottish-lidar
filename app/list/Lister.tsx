
import * as React from 'react'
import _ from 'lodash'

import { State } from '../state'
import { Collection } from '../catalog'

type Props = {
  collections: State['collections']
  filter: string
  setQuery: (s: string) => void
} // & State['lister']

// interface DispatchProps {
//   doFoo: () => Promise<void>
// }

export const Lister = (props: Props) => {

  let collectionOptionsUI = _(props.collections)
    .groupBy(c => c.name.Group)
    .keys()
    .map(key => <option key={key} value={key}>{key}</option>)
    .value()
    
  let collectionListUI = props.collections
    // if there's a filter specified, filter the collections by that group
    .filter(c => !props.filter || c.name.Group === props.filter)
    .map(c =>
      <li key={c.collection.id}>
        <div>{c.collection.metadata.title}</div>
        <div>{c.collection.name}</div>
        <div>{c.collection.metadata.abstract}</div>
      </li>
    )

  return (
    <div>
      <h1>Collections</h1>
      <div>
        <span>{collectionListUI.length} of {props.collections.length} datasets shown </span>
        {props.filter &&
          <span>filtered by <span style={{fontWeight: 'bold'}}>{props.filter}</span></span>
        }
      </div>
      <hr />
      <div>
      <select
        value={props.filter}
        onChange={(e) => { props.setQuery(e.target.value) } }
        className="form-control" >
        <option key="all" value="">All</option>
        {collectionOptionsUI}
      </select>
      </div>
      <hr />
      <ul>
        {collectionListUI}
      </ul>
    </div>
  )
}
