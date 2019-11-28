
import React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, MapActions, DispatchProps } from '../../state'
import { Form } from 'react-bootstrap'
import { Collection } from '../../catalog/types'
import { DatasetModal } from '../../shared/DatasetModal'

type Props = {
  currentCollection: CollectionTuple & { productCountForCurrentQuery: number }
  checked: boolean
}

export const DatasetListItemComponent = (props: Props & DispatchProps) => {

  let [modalOpen, setModalOpen] = React.useState(false)

  return (
    <div className="dataset-list-item">
      <div>
        <Form.Check
          className="hoverable"
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
        <span className="dataset-list-item-info" onClick={() => setModalOpen(true)}>
          <i className="fas fa-info-circle" />
        </span>
        <DatasetModal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
        />
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
