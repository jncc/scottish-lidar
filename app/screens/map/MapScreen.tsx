
import * as React from 'react'

import { AddToBasketButton } from './AddToBasketButton'

// draw the leaflet map in the div
// let div = document.getElementById('map') as HTMLElement
// createMap(div, config)

export const MapScreen = (props: any) => {
  return (
    <div>
      This is the mapper
      <AddToBasketButton />
    </div>
  )
}
