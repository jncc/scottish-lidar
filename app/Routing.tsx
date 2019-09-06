
import * as React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Lister } from './list/Lister'

function MapComponent() {
  return <h2>This is the Map page</h2>
}

function NotFoundComponent() {
  return (
    <div>
      <h1>Not found</h1>
      <p>Please check the URL you entered.</p>
    </div>
  )
}

export function Routing() {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Redirect from="/" exact to="/list" />
          <Route path="/list" component={Lister} />
          <Route path="/map" component={MapComponent} />
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
