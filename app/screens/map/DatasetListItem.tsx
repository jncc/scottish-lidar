
import React from 'react'
import _ from 'lodash'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State, MapActions, DispatchProps } from '../../state'
import { Form } from 'react-bootstrap'
import { Collection } from '../../catalog/types'
import { Tip } from '../../shared/Tip'

type Props = {
  currentCollection: CollectionTuple & { productCountForCurrentQuery: number }
  checked: boolean
}

export const DatasetListItemComponent = (props: Props & DispatchProps) => {
  return (
    <div className="dataset-list-item">
      <div>
        <Form.Check 
          custom
          inline
          type={'radio'}
          id={`radio-` + props.currentCollection.path.dataset}
          label={props.currentCollection.path.shortName}
          checked={props.checked}
          onChange={() => props.dispatch(MapActions.setCollection(props.currentCollection.collection.name))}
        />
      </div>
      <div>
        <span className="mr-2">
          {props.currentCollection.productCountForCurrentQuery} 
        </span>
        <Tip identifier={'info-tip-' + props.currentCollection.collection.id}
          content={getDatasetInfoTipUI(props.currentCollection.collection)}>
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

export const DatasetListItem = reduxConnect()(DatasetListItemComponent)
