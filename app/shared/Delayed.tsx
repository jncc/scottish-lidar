
import React, { FunctionComponent } from 'react'
import { Fade } from 'react-bootstrap'

type Props = {
  delayInMilliseconds: number
  children: React.ReactElement
}

/** Delays the initial render of child components
 *  for the specified duration, after which they are
 *  faded in. */
export const Delayed: FunctionComponent<Props> = (props) => {

  let [visible, setVisible] = React.useState(false)
 
  React.useEffect(() => {
    setTimeout(() => { setVisible(true) }, props.delayInMilliseconds)
  }, [])

  return (
    <Fade in={visible}>{props.children}</Fade>      
  )
}
