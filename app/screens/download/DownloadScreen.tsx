
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
  
  let [visible, setVisible] = React.useState(true)
  let [basket] = useBasket()

  let basketItemElements = basket.items.map(item =>
    <li key={item.productId}>
      {item.productId}
    </li>  
  )

  return (
    <div>
      <div>
        <Button onClick={() => setVisible((prev => !prev))}>
          Click me
        </Button>
      </div>
      <motion.div
        // initial="hidden"
        animate={{ opacity: visible ? 1 : 0}}
        // variants={variants}
      >
        Hello
      </motion.div>

      <h1>Download</h1>
      <ul>
        {basketItemElements}
      </ul>
    </div>
  )
}
