
import React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, AppActions, DispatchProps } from '../../state'
import { Form, Button } from 'react-bootstrap'
import { Collection } from '../../catalog/types'
import { DatasetModal } from '../../shared/DatasetModal'
import { WmsModal } from '../../shared/WmsModal'

type Props = {
  collection: CollectionTuple & { productCountForCurrentQuery: number }
  checked: boolean
}

const DatasetListItemComponent = (props: Props & DispatchProps) => {

  let [wmsModalOpen, setWmsModalOpen] = React.useState(false)
  let [infoModalOpen, setInfoModalOpen] = React.useState(false)

  return (
    <div className="dataset-list-item">
      <div>
        <Form.Check
          className="hoverable"
          custom
          inline
          title={props.collection.collection.name}
          type={'radio'}
          id={`dataset-radio-` + props.collection.path.dataset}
          label={props.collection.path.shortName}
          checked={props.checked}
          onChange={() => props.dispatch(AppActions.setCollection(props.collection.collection.name))}
        />
      </div>
      <div>
        <span className="mr-3">
          {props.collection.productCountForCurrentQuery} 
        </span>

          {/* WMS */}
          {props.collection.ogcProduct && props.collection.ogcProduct.data.product.wms &&
            <span className="mr-1">
              <span className="hoverable-little-icon" onClick={() => setWmsModalOpen(true)}>
                <i className="fas fa-globe" aria-hidden="true" />
              </span>
              <WmsModal
                show={wmsModalOpen}
                onHide={() => setWmsModalOpen(false)}
                wmsLink={props.collection.ogcProduct.data.product.wms.url}
              />
            </span>
          }

        <span className="hoverable-little-icon" onClick={() => setInfoModalOpen(true)}>
          <i className="fas fa-info-circle" aria-hidden="true" />
        </span>
        <DatasetModal
          show={infoModalOpen}
          onHide={() => setInfoModalOpen(false)}
          collection={props.collection.collection}
          path={props.collection.path}
        />
      </div>
      
    </div>
  )
}

export const DatasetListItem = reduxConnect()(DatasetListItemComponent)
