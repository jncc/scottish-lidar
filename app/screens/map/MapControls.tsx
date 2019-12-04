
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { DispatchProps, State, AppActions } from '../../state'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Delayed } from '../../shared/Delayed'

type Props = {
}
type StateProps = State['mapScreen']

const MapControlsComponent = (props: Props & DispatchProps) => {
  return (
    <Delayed delayInMilliseconds={800}>
      <div className="bottom-left-controls">

          <div>
            <ButtonGroup className="mr-2">
              <Button onClick={() => props.dispatch(AppActions.leafletZoomIn())} variant="light">
                <i className="fas fa-plus fa-xs zoom-icon"/>
              </Button>
              <Button onClick={() => props.dispatch(AppActions.leafletZoomOut())} variant="light">
                <i className="fas fa-minus fa-xs zoom-icon"/>
              </Button>
            </ButtonGroup>
          </div>
          <div>
            
            <Button onClick={() => props.dispatch(AppActions.resetToCenter())} variant="light">
              <i className="fas fa-crosshairs mr-1"/>
              Reset
            </Button>
          </div>

      </div>
    </Delayed>
  )
}

export const MapControls = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(MapControlsComponent)
