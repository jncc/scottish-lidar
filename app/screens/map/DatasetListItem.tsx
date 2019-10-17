
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'

type Props = {
  collection: CollectionTuple & { productCount: number }
}

export const DatasetListItem = (props: Props) => {
  return (
    <div key={props.collection.collection.name}>
      <div>{props.collection.collection.name} {props.collection.productCount}</div>
    </div>
  )
}
