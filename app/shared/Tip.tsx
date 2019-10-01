
/**
 * A standard tooltip for the app.
 */

import React, { FunctionComponent } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

type Props = {
  identifier: string
  title?: string
  content: string | React.ReactNode
}

export const Tip: FunctionComponent<Props> = (props) => {

  const popover = 
    <Popover id={'tip-' + props.identifier}>
      { props.title && 
      <Popover.Title as="h3">{props.title}</Popover.Title>
      }
      <Popover.Content>
        {props.content}
      </Popover.Content>
    </Popover>

  return (
    <OverlayTrigger overlay={popover} delay={{ show: 400, hide: 0 }}>
      {props.children}
    </OverlayTrigger>
  )
}
