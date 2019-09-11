
import * as React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Lister } from './list/Lister'
import { Mapper } from './map/Mapper'
import { State } from './state'

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
          <Route path="/list/:filter?" render={(routeProps) => {
            let filter = routeProps.location.search.replace(/\?/, '') // remove leading '?'
            console.log(filter)
            return <Lister collections={props.collections} filter={filter} />
          }
          } />
          <Route path="/map" component={Mapper} />
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
