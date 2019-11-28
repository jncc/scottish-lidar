
import React from 'react'
import _ from 'lodash'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State, MapActions, DispatchProps } from '../../state'
import { Form, Button } from 'react-bootstrap'
import { Collection } from '../../catalog/types'
import { Tip } from '../../shared/Tip'
import { WmsModal } from '../../shared/WmsModal'

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
        <WmsModal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          wmsLink={'https://example.com/'}
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
