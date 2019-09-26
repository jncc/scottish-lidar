
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
    // .map(key => <Dropdown.Item href="#/action-1">Action</Dropdown.Item>)
    .value()
    
  let listItemElements = props.collections
    // if there's a filter specified, filter the collections by that group
    .filter(c => !props.filter || c.name.Group === props.filter)
    .map(c => <ListItem collection={c}/>)

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
              Showing {listItemElements.length} of {props.collections.length} datasets
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

      <hr />
      <ul>
        {listItemElements}
      </ul>
    </div>
  )
}
