
// The React app entrypoint.
// Import browser polyfills and render the app into the DOM.

import * as React from 'react'
import * as ReactDOM from 'react-dom'

// polyfills
import 'ts-polyfill'
import 'whatwg-fetch'
import 'nodelist-foreach-polyfill' // needed for IE11

// 
import 'leaflet/dist/leaflet.css'

import { env } from '../env'
import { App } from './App'

if (env.NODE_ENV === 'development') {
  // tslint:disable-next-line
  console.log('App is starting up...')
}
if (!env.CATALOG_API_ENDPOINT) {
  // tslint:disable-next-line
  console.log('CATALOG_API_ENDPOINT is required.')
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
)
