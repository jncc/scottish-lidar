
import * as React from 'react'
import { motion } from 'framer-motion'

const animationVariants = {
  attention: {
    scale: [1, 1.2, 1],
    rotate: [180, 360, 360],
  },
  normal: {}
}

type Props = {
  count: number
}

export const BasketSummaryCount = (props: Props) => {

  let [changed, setChanged] = React.useState(false)
  
  React.useEffect(() => {
    setChanged(true)
    setTimeout(() => setChanged(false), 1000)
  }, [props.count])

  return (
    <motion.div className="basket-summary-count"
      animate={changed ? 'attention' : 'normal'}
      variants={animationVariants}
      transition={{duration: 0.3}}>
      <span className="badge badge-pill badge-primary">
        {props.count}
      </span>
    </motion.div>
  )
}
