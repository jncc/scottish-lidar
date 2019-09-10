
// The React app entrypoint.
// Import polyfills and render the app into the DOM.

import * as React from 'react'
import * as ReactDOM from 'react-dom'

// polyfills
import 'whatwg-fetch'
// import 'ts-polyfill/lib/es2016-array-include'
// import 'ts-polyfill/lib/es2017-object'
// import 'ts-polyfill/lib/es2017-string'
// import 'url-search-params-polyfill'

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
  <App />,
  document.getElementById('app')
)
