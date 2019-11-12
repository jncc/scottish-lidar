
// for parcelling images
declare module '*.png'

declare module 'react-copy-to-clipboard'
declare module 'redux-cookies-middleware'

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

// declare our own types for leaflet-fullscreen plugin
// declare namespace L {
//   namespace Control {
//       class Fullscreen extends Control {
//           constructor(options?: any);
//       }
//   }
// }
