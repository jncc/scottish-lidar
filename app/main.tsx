
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

// polyfills
// import 'ts-polyfill/lib/es2016-array-include'
// import 'ts-polyfill/lib/es2017-object'
// import 'ts-polyfill/lib/es2017-string'

// import 'url-search-params-polyfill'

import { env } from '../env'

if (!env.CATALOG_API_ENDPOINT) {
  // tslint:disable-next-line
  console.log('CATALOG_API_ENDPOINT is required')
}

// draw the leaflet map in the div
// let div = document.getElementById('map') as HTMLElement
// createMap(div, config)

const MyComponent = () => {
  return <div>This is the app!</div>
}

ReactDOM.render(
  <CookiesProvider>
    <MyComponent />
  </CookiesProvider>,
  document.getElementById('app')
)
