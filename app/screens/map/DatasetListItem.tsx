
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
          // add some space around any slashes in short names
          label={props.collection.path.shortName.replace(`/`, `\u2009/\u2009`)}
          checked={props.checked}
          onChange={() => props.dispatch(AppActions.setCollection(props.collection.collection.name))}
        />
      </div>
      <div>
        <span className="dataset-list-item-product-count mr-3">
          {props.collection.productCountForCurrentQuery} 
        </span>

          {/* WMS */}
          {props.collection.ogcProduct && props.collection.ogcProduct.data.product.wms &&
            <span className="mr-1">
              {/* we want the semantics of a button but none of the styling... */}
              <button onClick={() => setWmsModalOpen(true)}
                style={{border:'none', background:'none', padding:0, margin:0}}
                aria-label='Get WMS link'>
                <span className="hoverable-little-icon" >
                  <i className="fas fa-globe" aria-hidden="true" />
                </span>
              </button>
              <WmsModal
                show={wmsModalOpen}
                onHide={() => setWmsModalOpen(false)}
                wmsLink={props.collection.ogcProduct.data.product.wms.url}
              />
            </span>
          }
        <button onClick={() => setInfoModalOpen(true)}
          style={{border:'none', background:'none', padding:0, margin:0}}
          aria-label='About this dataset'>
          <span className="hoverable-little-icon" >
            <i className="fas fa-info-circle" aria-hidden="true" />
          </span>
        </button>
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
