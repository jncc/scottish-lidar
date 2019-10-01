
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
  let abstractElementId = 'abstract-' + c.collection.id
  let [modalShow, setModalShow] = useState(false)

  return (
    <div className="list-item row mb-3">

      <div className="col">

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

      <div className="col-md-2 d-flex flex-column align-items-end">

        {/* licence */}
        {makeLicenceElement(c.collection.metadata.useConstraints)}

        {/* external metadata link */}
        {c.collection.metadata.additionalInformationSource &&
          <div>
            {makeExternalMetadataLinkElement(c.collection.metadata.additionalInformationSource)}
          </div>
        }

        {/* OGC WMS link */}
        {c.ogcProduct && c.ogcProduct.data.product.wms &&
          <div>
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

        <Link
          to={{
            pathname: '/map',
            search: c.name.Dataset
          }}
          className="btn btn-primary"
        >View on map</Link>

      </div>

    </div>

  )
}

let makeLicenceElement = (useConstraints: string) => {

  let licence = getLicenceDetailsFromUseConstraints(useConstraints)

  
  return (
    <div className="licence">
      { licence.image ?
        (<a href={licence.url} target="_blank" >
        <img src={licence.image} width="80" height="33" />
        </a>)
      : 
      (
<a href={licence.url} target="_blank" >
        {licence.name} {/* <Icon name="external" /> */}
        </a>        
      )
    }
    </div>
  )
}

let makeExternalMetadataLinkElement = (metadataExternalLink: string) => {

  let linkUI =(
      <a className="btn btn-light" href={metadataExternalLink} target="_blank">
        Metadata
        <i className="fas fa-cog text-secondary ml-2" />
      </a>
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
