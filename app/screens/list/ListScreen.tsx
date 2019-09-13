
import * as React from 'react'
import _ from 'lodash'

import { State } from '../../state'
import { getLicenceDetailsFromUseConstraints } from '../../utility/licenseUtility'

type Props = {
  collections: State['collections']
  filter: string
  setFilter: (s: string) => void
} // & State['lister']

// interface DispatchProps {
//   doFoo: () => Promise<void>
// }

export const ListScreen = (props: Props) => {

  let filterDropdownElements = _(props.collections)
    .groupBy(c => c.name.Group)
    .keys()
    .map(key => <option key={key} value={key}>{key}</option>)
    .value()
    
  let collectionListElements = props.collections
    // if there's a filter specified, filter the collections by that group
    .filter(c => !props.filter || c.name.Group === props.filter)
    .map(c =>
      <li key={c.collection.id}>
        <div>{c.collection.metadata.title}</div>
        <div>{c.collection.name}</div>
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

  return (
    <div>
      <h1>Datasets</h1>
      <div>Browse the available datasets on the portal.</div>
      <hr />
      <div>
        Showing {collectionListElements.length} of {props.collections.length} datasets
        {props.filter &&
          <span> filtered by <span style={{fontWeight: 'bold'}}>{props.filter}</span></span>
        }
      </div>
      <hr />
      <div>
      <select
        value={props.filter}
        onChange={e => { props.setFilter(e.target.value) }}
        className="form-control" >
        <option key="all" value="">All</option>
        {filterDropdownElements}
      </select>
      </div>
      <hr />
      <ul>
        {collectionListElements}
      </ul>
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
