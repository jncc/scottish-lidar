
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'
import _ from 'lodash'

import { State } from '../../state'
import { getLicenceDetailsFromUseConstraints } from '../../utility/licenseUtility'
import { DatasetName } from '../../shared/DatasetName'
import { WmsModal } from '../../shared/WmsModal'

type Props = {
  collection: State['collections'][0]
}

export const ListItem = (props: Props) => {

  let c = props.collection
  let abstractId = 'abstract-' + c.collection.id
  let [modalShow, setModalShow] = useState(false)

  return (
    <div key={c.collection.id} className="list-item mb-4">
      <div className="list-item-title">
        <i className="fas fa-th fa-xs text-secondary mr-2" />
        {c.collection.metadata.title}
      </div>      

      <div className="mb-3">
        <DatasetName dataset={c.name.Dataset} />
      </div>

      <div className="list-item-abstract moreable">
        <p
          className="collapse moreable-content"
          id={abstractId}
          aria-expanded="false">
          {c.collection.metadata.abstract}
        </p>
        <a role="button" className="collapsed"
        data-toggle="collapse" href={'#' + abstractId}
        aria-expanded="false" aria-controls="collapseExample"></a>
      </div>

      <div className="card-body">
        <div className="card-title"></div>
        <div className="card-subtitle mb-2 text-muted">

        </div>
      </div>

      {/* external metadata link */}
      {c.collection.metadata.additionalInformationSource &&
        <div>
          {makeExternalMetadataLinkElement(c.collection.metadata.additionalInformationSource)}
        </div>
      }

      {/* licence */}
      {makeLicenceElement(c.collection.metadata.useConstraints)}

      {/* OGC WMS link */}
      {c.ogcProduct && c.ogcProduct.data.product.wms &&
        <div>
          <Button variant="dark" onClick={() => setModalShow(true)}>
            <i className="fas fa-globe mr-2" />
            WMS
          </Button>

          <WmsModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            wmsLink={c.ogcProduct.data.product.wms.url}
          />
        </div>
      }

      <Link
        to={{
          pathname: '/map',
          search: c.name.Dataset
        }}
        className="btn btn-primary"
      >View on map</Link>

    </div>

  )
}

let makeLicenceElement = (useConstraints: string) => {

  let licence = getLicenceDetailsFromUseConstraints(useConstraints)

  return (
    <div className="licence">
      <div>
        <a href={licence.url} target="_blank" >
        {licence.name} {/* <Icon name="external" /> */}
        </a>
      </div>
      {licence.image &&
      <div>
        <a href={licence.url} target="_blank" >
          <img src={licence.image} width="80" height="33" />
        </a>
      </div>
      }
    </div>
  )
}

let makeExternalMetadataLinkElement = (metadataExternalLink: string) => {

  let linkUI =(
    <span>
      <a href={metadataExternalLink} target="_blank">
        Metadata {/* <Icon name='external' /> */}
      </a>
    </span>
  )

  // return (
  //   <Tooltip
  //     position='left center'
  //     content='More information about this data collection'
  //     trigger={linkUI}
  //   />
  // )

  return linkUI
}
