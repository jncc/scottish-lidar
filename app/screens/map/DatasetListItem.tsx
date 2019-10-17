
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'

type Props = {
  collection: CollectionTuple & { productCountForCurrentQuery: number }
}

export const DatasetListItem = (props: Props) => {
  return (
    <div>
      <div>{props.collection.collection.name} - {props.collection.productCountForCurrentQuery}</div>
    </div>
  )
}
