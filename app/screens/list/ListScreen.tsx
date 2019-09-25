
import * as React from 'react'
import _ from 'lodash'
import { DropdownButton, Dropdown, InputGroup, FormControl, Form } from 'react-bootstrap'

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
    // .map(key => <Dropdown.Item href="#/action-1">Action</Dropdown.Item>)
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
    <div className="container normal-page-container full-height-container">
      <div className="mb-4">
        <h1 className="inline mr-3">Datasets</h1>
        {/* <span className="raised">Browse the available datasets on the portal.</span> */}
      </div>
      <div className="card card-body bg-light">
        <div className="row align-items-center">
          <div className="col">
            <span>
              Showing {collectionListElements.length} of {props.collections.length} datasets
              {props.filter &&
                <span> filtered by <span style={{fontWeight: 'bold'}}>{props.filter}</span></span>
              }
            </span>
          </div>
          <div className="col-auto">
            <select
              value={props.filter}
              onChange={e => { props.setFilter(e.target.value) }}
              className="custom-select my-select" >
              <option key="all" value="">All</option>
              {filterDropdownElements}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        </div>

      <div>

        {/* <DropdownButton  id="dataset-filter-select" title="All"   onSelect={function(e:any){console.log(e)}}>
          <Dropdown.Item eventKey="all">All</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="foo1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="foo2">Another action</Dropdown.Item>
        </DropdownButton> */}

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
