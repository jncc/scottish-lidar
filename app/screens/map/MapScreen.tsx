
import * as React from 'react'

import { AddToBasketButton } from './AddToBasketButton'
import { State } from '../../state'

type Props = {
  collections: State['collections']
}

// draw the leaflet map in the div
// let div = document.getElementById('map') as HTMLElement
// createMap(div, config)

export const MapScreen = (props: Props) => {
  
  return (
    <div>
      This is the mapper
      <AddToBasketButton />
    </div>
  )
}
