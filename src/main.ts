

// styles
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles.less'
// import 'leaflet/dist/leaflet.css'
// import '../css/leaflet-sidebar.min.css'

// polyfills
// import 'ts-polyfill/lib/es2016-array-include'
// import 'ts-polyfill/lib/es2017-object'
// import 'ts-polyfill/lib/es2017-string'
// import 'url-search-params-polyfill'

import { env } from './env'

// draw the leaflet map in the div
// let div = document.getElementById('map') as HTMLElement
// createMap(div, config)

console.log('hello')

if (!env.CATALOG_API_ENDPOINT) {
    console.log('CATALOG_API_ENDPOINT is required')
}
