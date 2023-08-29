
/**
 * A standard tooltip for the app.
 */

import React, { FunctionComponent } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

type Props = {
  identifier: string
  title?: string
  content: string | React.ReactNode
  children: React.ReactElement
}

export const Tip: FunctionComponent<Props> = (props) => {

  const popover = 
    <Popover 
      id={'tip-' + props.identifier}
      title="{props.title}"
    >
      {props.content}
    </Popover>

  return (
    <OverlayTrigger
      overlay={popover}
      delay={{ show: 400, hide: 0 }}
    >
      {props.children}
    </OverlayTrigger>
  )
}
