
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'
import { Form } from 'react-bootstrap'
import { Collection } from '../../catalog/types'
import { Tip } from '../../shared/Tip'

type Props = {
  collection: CollectionTuple & { productCountForCurrentQuery: number }
  checked: boolean
  onCheck: (collectionId: string) => void
}

export const DatasetListItem = (props: Props) => {
  return (
    <div className="dataset-list-item">
      <div>
        <Form.Check 
          custom
          inline
          type={'radio'}
          id={`radio-` + props.collection.path.dataset}
          label={props.collection.path.shortName}
          checked={props.checked}
          onChange={() => props.onCheck(props.collection.collection.name)}
        />
      </div>
      <div>
        <span className="mr-2">
          {props.collection.productCountForCurrentQuery} 

        </span>
        <Tip identifier={'info-tip-' + props.collection.collection.id}
          content={getDatasetInfoTipUI(props.collection.collection)}>
          <i className="fas fa-info-circle" />
        </Tip>
      </div>
    </div>
  )
}

let getDatasetInfoTipUI = (c: Collection) => {
  return (
    <div>
      <h5>{c.metadata.title}</h5>
      <div>{c.metadata.abstract}</div>
    </div>
  )
}
