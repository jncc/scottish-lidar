
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
// import groupBy from 'lodash'

import { State } from '../state'
import { Collection } from '../catalog'
import { parseCollectionName } from '../utility/collectionUtility'

type Props = {
  collections: State['collections']
} & State['lister']

// interface DispatchProps {
//   doFoo: () => Promise<void>
// }

export const Lister = (props: Props) => {
  let collectionsListUI = props.collections.map((c) => {
    return (
      <li key={c.collection.id}>
        <div>{c.collection.metadata.title}</div>
        <div>{c.collection.name}</div>
        <div>{c.collection.metadata.abstract}</div>
      </li>
    )
  })

  let redirect = () => <Redirect to="/map" />
  
  let optionsUI = _(props.collections)
    .groupBy(c => c.name.Group)
    .keys()
    .map(key => <option key={key} value={key}>{key}</option>)
    .value()

    // default value="mango"
  return (
    <div>
      <h1>List of collections!!</h1>
      <div>
      <select onChange={() => {
        console.log('hi')
        return }
      } >
        {optionsUI}
      </select>
      </div>
      <ul>
        {collectionsListUI}
      </ul>
    </div>
    // <Redirect to="/map" />    
  )
}
