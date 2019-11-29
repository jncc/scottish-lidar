
import React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, MapActions, DispatchProps } from '../../state'
import { Form } from 'react-bootstrap'
import { Collection } from '../../catalog/types'
import { DatasetModal } from '../../shared/DatasetModal'

type Props = {
  collection: CollectionTuple & { productCountForCurrentQuery: number }
  checked: boolean
}

const DatasetListItemComponent = (props: Props & DispatchProps) => {

  let [modalOpen, setModalOpen] = React.useState(false)

  return (
    <div className="dataset-list-item">
      <div>
        <Form.Check
          className="hoverable"
          custom
          inline
          type={'radio'}
          id={`radio-` + props.collection.path.dataset}
          label={props.collection.path.shortName}
          checked={props.checked}
          onChange={() => props.dispatch(MapActions.setCollection(props.collection.collection.name))}
        />
      </div>
      <div>
        <span className="mr-2">
          {props.collection.productCountForCurrentQuery} 
        </span>
        <span className="dataset-list-item-info" onClick={() => setModalOpen(true)}>
          <i className="fas fa-info-circle" />
        </span>
        <DatasetModal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          collection={props.collection.collection}
          path={props.collection.path}
        />
      </div>
    </div>
  )
}

export const DatasetListItem = reduxConnect()(DatasetListItemComponent)
