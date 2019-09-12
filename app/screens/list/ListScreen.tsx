
import * as React from 'react'
import _ from 'lodash'

import { State } from '../../state'

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
        {/* show the OGC WMS link */}
        {c.ogcProduct && c.ogcProduct.data.product.wms &&
          <div>
            <div>{c.ogcProduct.data.product.wms.name}</div>
            <div>{c.ogcProduct.data.product.wms.url}</div>
          </div>          
        }
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
