
import React, { useState, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Collapse, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap'
import _ from 'lodash'

import { State } from '../../state'
import { getLicenceDetailsFromUseConstraints } from '../../utility/licenseUtility'
import { DatasetName } from '../../shared/DatasetName'
import { WmsModal } from '../../shared/WmsModal'
import { Tip } from '../../shared/Tip'

type Props = {
  collection: State['collections'][0]
}

export const ListItem = (props: Props) => {

  let c = props.collection
  let abstractElementId = 'abstract-' + c.collection.id
  let [modalShow, setModalShow] = useState(false)

  return (
    <div className="list-item row mb-lg-3 mb-5">

      <div className="col mb-lg-0 mb-3">

        <div className="list-item-title">
          <i className="fas fa-th fa-xs text-secondary mr-2" />
          {c.collection.metadata.title}
        </div>      

        <div className="list-item-dataset-name mb-3">
          <DatasetName dataset={c.name.Dataset} />
        </div>

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

      <div className="col-lg-2 d-flex flex-lg-column align-items-end">

        {/* Licence */}
        <div className="mb-lg-2 mr-lg-0 mr-2">
          {makeLicenceElement(c.collection.metadata.useConstraints)}
        </div>

        {/* Metadata */}
        {c.collection.metadata.additionalInformationSource &&
          <div className="mb-lg-2 mr-lg-0 mr-2">
            {makeExternalMetadataLinkElement(c.collection.metadata.additionalInformationSource, c.collection.id)}
          </div>
        }

        {/* WMS */}
        {c.ogcProduct && c.ogcProduct.data.product.wms &&
          <div className="mb-lg-2 mr-lg-0 mr-2">
            <Button variant="light" onClick={() => setModalShow(true)}>
              WMS
              <i className="fas fa-globe text-secondary ml-2" />
            </Button>
            <WmsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              wmsLink={c.ogcProduct.data.product.wms.url}
            />
          </div>
        }

        {/* View on map */}
        <div className="mb-lg-2 mr-lg-0 mr-2">
          <Link
            to={{
              pathname: '/map',
              search: c.name.Dataset
            }}
            className="btn btn-primary"
          >View on map</Link>
        </div>

      </div>
    </div>
  )
}

let makeLicenceElement = (useConstraints: string) => {
  let licence = getLicenceDetailsFromUseConstraints(useConstraints)
  return (
    <div className="licence">
      { licence.image
        ?
        (<a href={licence.url} target="_blank" >
          <img src={licence.image} width="80" height="33" />
        </a>)
        : 
        (<a href={licence.url} target="_blank" >
          {licence.name} {/* <Icon name="external" /> */}
          </a>)
      }
    </div>
  )
}

let makeExternalMetadataLinkElement = (metadataExternalLink: string, collectionId: string) => {
  return (
    <Tip identifier={collectionId} content="More information about this dataset">
      <a className="btn btn-light" href={metadataExternalLink} target="_blank">
        Metadata
        <i className="fas fa-cog text-secondary ml-2" />
      </a>
    </Tip>
  )
}
