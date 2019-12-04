
import * as React from 'react'
import { motion } from 'framer-motion'

const variants = {
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

  let [lengthChanged, setLengthChanged] = React.useState(false)
  
  React.useEffect(() => {
    setLengthChanged(true)
    setTimeout(() => setLengthChanged(false), 1000)
  }, [props.count])

  return (
    <motion.div className="basket-summary-count"
      animate={lengthChanged ? 'attention' : 'normal'}
      variants={variants}
      transition={{duration: 0.3}}
    >
      <span className="float-right badge badge-pill badge-primary">
        {props.count}
      </span>
    </motion.div>
  )
}
