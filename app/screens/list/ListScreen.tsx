
import * as React from 'react'
import _ from 'lodash'
import { DropdownButton, Dropdown, InputGroup, FormControl, Form } from 'react-bootstrap'

import { State } from '../../state'
import { ListItem } from './ListItem'

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
    
  let listItemElements = props.collections
    // if there's a filter specified, filter the collections by that group
    .filter(c => !props.filter || c.name.Group === props.filter)
    .map(c => <ListItem collection={c} key={c.collection.id} />)

  return (
    <div className="container normal-page-container list-screen">
      <h1>Datasets</h1>
      <hr />
      <div className="row align-items-center filter-bar">
        <div className="col">
          <span>
            Showing 
            {listItemElements.length == props.collections.length &&
              <span> all</span>
            }
            <span className="badge badge-pill badge-light">
              <span className="badge badge-pill badge-secondary mr-1">
                {listItemElements.length}
              </span>
              of {props.collections.length}
            </span>
          </span> datasets
        </div>

        <div className="col-auto">
          {props.filter &&
            <span>Filtered by</span>
          }
        </div>
        <div className="col-auto">
          <select
            value={props.filter}
            onChange={e => { props.setFilter(e.target.value) }}
            className="custom-select" >
            <option key="all" value="">All</option>
            {filterDropdownElements}
          </select>
        </div>
      </div>
      <hr className="filter-bar-hr"/>
      <div className="list-items">
        {listItemElements}
      </div>
    </div>
  )
}
