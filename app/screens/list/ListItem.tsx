
import React from 'react'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import { connect as reduxConnect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { CollectionTuple, DispatchProps, AppActions } from '../../state'
import { DatasetPath } from '../../shared/DatasetPath'
import { WmsModal } from '../../shared/WmsModal'
import { DatasetLicenceAndMetadataButtons } from '../../shared/DatasetLicenceAndMetadataButtons'

type Props = {
  collection: CollectionTuple
}

const ListItemComponent = (props: Props & DispatchProps) => {

  let history = useHistory()
  let c = props.collection
  let abstractElementId = 'abstract-' + c.collection.id
  let [modalOpen, setModalOpen] = React.useState(false)

  return (
    <div className="list-item row mb-lg-3 mb-5">

      <div className="col mb-lg-0 mb-3">

        {/* Title */}
        <div className="list-item-title">
          <i className="fas fa-th fa-lg text-primary mr-2" />
          <span className="ml-1">
            {c.collection.metadata.title}
          </span>
        </div>      

        {/* Path */}
        <div className="list-item-dataset-name mb-2">
          <DatasetPath dataset={c.path.dataset} />
        </div>

        {/* Abstract */}
        <div className="list-item-abstract moreable">
          <p id={abstractElementId}
            className="collapse moreable-content"
            aria-expanded="false">
            {c.collection.metadata.abstract}
          </p>
          <a role="button" className="collapsed"
            data-toggle="collapse" href={'#' + abstractElementId}
            aria-expanded="false" aria-controls="collapseExample"></a>
        </div>        
      </div>

      <div className="col-lg-3 d-flex align-items-lg-center">

        <div className="">

          <DatasetLicenceAndMetadataButtons collection={c.collection} />

          {/* WMS */}
          {c.ogcProduct && c.ogcProduct.data.product.wms &&
            <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
              <Button variant="light" onClick={() => setModalOpen(true)}>
                <i className="fas fa-globe text-secondary mr-2" />
                WMS
              </Button>
              <WmsModal
                show={modalOpen}
                onHide={() => setModalOpen(false)}
                wmsLink={c.ogcProduct.data.product.wms.url}
              />
            </div>
          }

          {/* View on map */}
          <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
            <Button onClick={() => {
              props.dispatch(AppActions.resetToCenter())
              props.dispatch(AppActions.setCollection(props.collection.collection.name))
              history.push('/map')
            }}>View on map</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export const ListItem = reduxConnect()(ListItemComponent)
