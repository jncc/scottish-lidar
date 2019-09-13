
import * as React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'

import { State } from './state'
import { ListScreen } from './screens/list/ListScreen'
import { MapScreen } from './screens/map/MapScreen'
import { DownloadScreen } from './screens/download/DownloadScreen'

function NotFoundComponent() {
  return (
    <div>
      <h1>Not found</h1>
      <p>Please check the URL you entered.</p>
    </div>
  )
}

export function Routing(props: State) {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Redirect from="/" exact to="/list" />
          <Route path="/list/:filter?" render={routeProps => {
            let filter = routeProps.location.search.replace(/^\?/, '') // remove leading '?'
            let setFilter = (s: string) => {
              routeProps.history.push(routeProps.location.pathname + '?' + s)
            }
            return <ListScreen collections={props.collections} filter={filter} setFilter={setFilter} />
          }} />
          <Route path="/map" component={MapScreen} />
          <Route path="/download" component={DownloadScreen} />
          <Route component={NotFoundComponent} />
        </Switch>
      </div>
    </HashRouter>
  )
}

{/* <nav>
<ul>
  <li>
    <Link to="/list">List</Link>
  </li>
  <li>
    <Link to="/map">Map</Link>
  </li>
</ul>
</nav> */}
