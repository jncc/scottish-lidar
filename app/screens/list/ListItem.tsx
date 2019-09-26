
import * as React from 'react'
import _ from 'lodash'

import { State } from '../../state'
import { getLicenceDetailsFromUseConstraints } from '../../utility/licenseUtility'

type Props = {
  collection: State['collections'][0]
}

export const ListItem = (props: Props) => {
  let c = props.collection
  return (
    <li key={c.collection.id}>
    <div>{c.collection.metadata.title}</div>
    <div>{c.collection.name}</div>
    <br />
    <div>{c.collection.metadata.abstract}</div>
    {/* external metadata link */}
    {c.collection.metadata.additionalInformationSource &&
      <div>
        {makeExternalMetadataLinkElement(c.collection.metadata.additionalInformationSource)}
      </div>
    }
    {/* OGC WMS link */}
    {c.ogcProduct && c.ogcProduct.data.product.wms &&
      <div>
        {/* <WmsModalButton
            url={c.data.wms.base_url + '?service=wms&version=1.3.0&request=GetCapabilities'}
            buttonProps={{content: 'WMS' }}
        /> */}
        <div>{c.ogcProduct.data.product.wms.url} {c.ogcProduct.data.product.wms.name}</div>
      </div>          
    }
    {/* licence */}
    {makeLicenceElement(c.collection.metadata.useConstraints)}
  </li>

  )
}

let makeLicenceElement = (useConstraints: string) => {

  let l = getLicenceDetailsFromUseConstraints(useConstraints)

  return (
    <div className="licence">
      <div>
        <a href={l.url} target="_blank" >
        {l.name} {/* <Icon name="external" /> */}
        </a>
      </div>
      {l.image &&
      <div>
        <a href={l.url} target="_blank" >
          <img src={l.image} width="80" height="33" />
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
