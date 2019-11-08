
import * as React from 'react'
import { useBasket } from '../../basket'

import { motion } from 'framer-motion'
import { Button } from 'react-bootstrap'

type Props = {
} 

// const variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// }

export const DownloadScreen = (props: Props) => {
  
  let [basket] = useBasket()

  let basketItemElements = basket.items.map(item =>
    <li key={item.id}>
      {item.size} {item.type} {item.name} {item.url}
    </li>  
  )

  return (
    <div>
      <h1>Download</h1>
      <ul>
        {basketItemElements}
      </ul>
    </div>
  )
}
