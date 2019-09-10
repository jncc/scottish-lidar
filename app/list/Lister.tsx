
import * as React from 'react'

import { Collection } from '../catalog'

interface Props {
  collections: Collection[]
}
// interface DispatchProps {
//   doFoo: () => Promise<void>
// }

export const Lister = (props: Props) => {
  let collectionsListUI = props.collections.map((c) => {
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
