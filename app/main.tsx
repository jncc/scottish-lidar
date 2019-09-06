
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

// polyfills
// import 'ts-polyfill/lib/es2016-array-include'
// import 'ts-polyfill/lib/es2017-object'
// import 'ts-polyfill/lib/es2017-string'

// import 'url-search-params-polyfill'

import { env } from '../env'

// tslint:disable-next-line
console.log('Hello')
// tslint:disable-next-line
console.log(env.CATALOG_API_ENDPOINT)

if (!env.CATALOG_API_ENDPOINT) {
  // tslint:disable-next-line
  console.log('CATALOG_API_ENDPOINT is required')
}

const MyComponent = () => {
  return <div>This is the app!</div>
}

function ListComponent() {
  return <h2>This is the List page</h2>
}

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

function MenuNav() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Redirect from="/" exact to="/list" />
          <Route path="/list" component={ListComponent} />
          <Route path="/map" component={MapComponent} />
          <Route component={NotFoundComponent} />
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <CookiesProvider>
    <MyComponent />
    <MenuNav />
  </CookiesProvider>,
  document.getElementById('app')
)

// draw the leaflet map in the div
// let div = document.getElementById('map') as HTMLElement
// createMap(div, config)
