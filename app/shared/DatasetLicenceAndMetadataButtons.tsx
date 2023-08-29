
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
      <div className="mb-lg-2 mb-0 me-1 d-inline-block">
        {makeLicenceElement(props.collection.metadata.useConstraints, props.collection.id)}
      </div>

      {/* Metadata */}
      <div className="mb-lg-2 mb-0 me-1 d-inline-block">
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
        ? <Tip identifier={'lic' + collectionId} content={licence.name + ' (opens in new tab)'}>
            <img src={licence.image} width="56" height="23" alt={'Licence: ' + licence.name} />
          </Tip>
        : <Tip identifier={'lic' + collectionId} content={licence.name + ' (opens in new tab)'}>
            <span>
              <i className="fas fa-book-open text-secondary me-2" aria-hidden="true" />
              Licence
            </span>
          </Tip>
      }
    </a>
  )
}

let makeExternalMetadataLinkElement = (metadataExternalLink: string, collectionId: string) => {
  return (
    <Tip identifier={collectionId} content="More information about this dataset  (opens in new tab)">
      <a className="btn btn-light" href={metadataExternalLink} target="_blank">
        <i className="fas fa-cog text-secondary me-2" aria-hidden="true" />
        Metadata
      </a>
    </Tip>
  )
}
