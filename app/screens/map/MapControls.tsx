
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { DispatchProps, State, AppActions } from '../../state'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import { Delayed } from '../../shared/Delayed'

type StateProps = State['mapScreen']

const MapControlsComponent = (props: StateProps & DispatchProps) => {
  return (
    <Delayed delayInMilliseconds={800}>
      <div className="bottom-left-controls">

          <div className="mr-2">
            <ButtonGroup>
              <Button onClick={() => props.dispatch(AppActions.leafletZoomIn())} variant="light">
                <i className="fas fa-plus fa-xs zoom-icon" aria-hidden="true" />
              </Button>
              <Button onClick={() => props.dispatch(AppActions.leafletZoomOut())} variant="light">
                <i className="fas fa-minus fa-xs zoom-icon" aria-hidden="true" />
              </Button>
            </ButtonGroup>
          </div>
          <div className="little-control-container mr-2">
            <Form.Check
              checked={props.visualise}
              type="switch"
              id="visualised-checkbox"
              label="Visualise"
              onChange={() => props.dispatch(AppActions.toggleVisualise())}
            />
          </div>
          <div>
            <Button onClick={() => props.dispatch(AppActions.resetToCenter())} variant="light">
              <i className="fas fa-crosshairs mr-2" aria-hidden="true" />
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
