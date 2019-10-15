
import React, { useEffect } from 'react'
import { HashRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom'

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
      <Switch>
        <Redirect from="/" exact to="/list" />
        <Route path="/list/:filter?" render={routeProps => {
          let filter = routeProps.location.search.replace(/^\?/, '') // remove leading '?'
          let setFilter = (s: string) => {
            routeProps.history.push(routeProps.location.pathname + '?' + s)
          }
          return <ListScreen collections={props.collections} filter={filter} setFilter={setFilter} />
        }} />
        <Route path="/map" render={() => <MapScreen collections={props.collections} />} />
        <Route path="/download" component={DownloadScreen} />
        <Route component={NotFoundComponent} />
      </Switch>
      <ActivateCurrentNavItem />
    </HashRouter>
  )
}

/**
 * Reaches outside the React app to the static header HTML
 * to apply the 'active' class to the current `nav-item`.
 * This side-effecting code is necessary because the HTML header is
 * completely outside the React app.
 */
const ActivateCurrentNavItem = withRouter((props: any) => {

  // withRouter gives us the current location from react-router
  let { location } = props

  useEffect(() => {
    // deactivate any currently active nav-item
    let header = document.querySelector('.header') as HTMLElement
    header.querySelectorAll('.nav-item').forEach(e => {
      e.classList.remove('active')
    })
    // activate the current screen's nav-item if it exists
    let screenName = location.pathname.substring(1) // remove the leading '/' from e.g. '/map'
    let navItem = document.getElementById(screenName + '-screen-nav-item')
    if (navItem) {
      navItem.classList.add('active')
    }
  }, [location]) // side-effect dependency

  // there's no UI to render
  return null
})
