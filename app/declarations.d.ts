
// for parcelling images
declare module '*.png'

declare module 'react-copy-to-clipboard'
declare module 'react-router-dom'

// the latest react-bootstrap release causes typescript errors
// ignore for now but remove this when fixed
declare module 'react-bootstrap'

// declare our own types for leaflet-editable plugin
// @types/leaflet-editable currently causes compile errors
declare namespace L {
  interface MapOptions {
      editable: boolean
  }
  interface Rectangle {
      enableEdit(): void
  }
}
