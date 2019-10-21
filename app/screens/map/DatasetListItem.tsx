
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'
import { Form } from 'react-bootstrap'

type Props = {
  collection: CollectionTuple & { productCountForCurrentQuery: number }
  checked: boolean
  onCheck: (collectionId: string) => void
}

export const DatasetListItem = (props: Props) => {
  return (
    <div>
      <Form.Check 
        custom
        inline
        type={'radio'}
        id={`radio-` + props.collection.name.Dataset}
        label={props.collection.name.Dataset}
        checked={props.checked}
        onChange={() => props.onCheck(props.collection.collection.name)}
      />
      {props.collection.productCountForCurrentQuery}
    </div>
  )
}
