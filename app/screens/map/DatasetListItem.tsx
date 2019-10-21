
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'
import { Form } from 'react-bootstrap'

type Props = {
  collection: CollectionTuple & { productCountForCurrentQuery: number }
}

export const DatasetListItem = (props: Props) => {
  return (
    <div>
      <Form.Check 
        custom
        type={'checkbox'}
        id={`radio-` + props.collection.name.Dataset}
        label={props.collection.name.Dataset}
      />
      <div>{} - {props.collection.productCountForCurrentQuery}</div>
    </div>
  )
}
