
import * as React from 'react'
import _ from 'lodash'

import { CollectionTuple } from '../../state'
import { ListItem } from './ListItem'
import { Delayed } from '../../shared/Delayed'

type Props = {
  collections: CollectionTuple[]
  filter: string
  setFilter: (s: string) => void
}

export const ListScreen = (props: Props) => {

  let filterDropdownElements = _(props.collections)
    .groupBy(c => c.path.group)
    .keys()
    .map(key => <option key={key} value={key}>{key}</option>)
    .value()
    
  let listItemElements = props.collections
    // if there's a filter specified, filter the collections by that group
    .filter(c => !props.filter || c.path.group === props.filter)
    .map(c => <ListItem collection={c} key={c.collection.id} />)

  return (
    <div className="container normal-page-container list-screen">
      <h1>Datasets</h1>
      <hr />
      <div className="filter-bar row align-items-center">
        <div className="col mb-md-0 mb-3">
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

        {props.filter &&
        <div className="col-md-auto d-lg-flex d-none">
            <span>Filtered by</span>
        </div>
        }

        <div className="col-md-auto mb-md-0 mb-2">
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
      <Delayed delayInMilliseconds={300}>
        <div className="list-items">
          {listItemElements}
        </div>
      </Delayed>
    </div>
  )
}
