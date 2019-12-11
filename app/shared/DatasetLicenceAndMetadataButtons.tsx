
import React from 'react'

import { Tip } from './Tip'
import { getLicenceDetailsFromUseConstraints } from '../utility/licenseUtility'
import { Collection } from '../catalog/types'

type Props = {
  collection: Collection
}

export const DatasetLicenceAndMetadataButtons = (props: Props) => {
  return (
    <div>

      {/* Licence */}
      <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
        {makeLicenceElement(props.collection.metadata.useConstraints, props.collection.id)}
      </div>

      {/* Metadata */}
      <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
        {props.collection.metadata.additionalInformationSource &&
            makeExternalMetadataLinkElement(props.collection.metadata.additionalInformationSource, props.collection.id)
        }
      </div>
    </div>
  )
}

let makeLicenceElement = (useConstraints: string, collectionId: string) => {
  let licence = getLicenceDetailsFromUseConstraints(useConstraints)
  return (
    <a href={licence.url} target="_blank" className="btn btn-light" >
      { licence.image
        ? <Tip identifier={'lic' + collectionId} content={licence.name}>
            <img src={licence.image} width="56" height="23" alt={'Licence: ' + licence.name} />
          </Tip>
        : <Tip identifier={'lic' + collectionId} content={licence.name}>
            <span>
              <i className="fas fa-book-open text-secondary mr-2" />
              Licence
            </span>
          </Tip>
      }
    </a>
  )
}

let makeExternalMetadataLinkElement = (metadataExternalLink: string, collectionId: string) => {
  return (
    <Tip identifier={collectionId} content="More information about this dataset">
      <a className="btn btn-light" href={metadataExternalLink} target="_blank">
        <i className="fas fa-cog text-secondary mr-2" />
        Metadata
      </a>
    </Tip>
  )
}
