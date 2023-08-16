
// The React app entrypoint.
// Import browser polyfills and render the app into the DOM.

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

// polyfills
import 'ts-polyfill'
import 'whatwg-fetch'
import 'nodelist-foreach-polyfill' // needed for IE11

// leaflet
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

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container!)
root.render(React.createElement(App))