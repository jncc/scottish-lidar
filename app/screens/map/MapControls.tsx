
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { DispatchProps, State } from '../../state'

type Props = {
}
type StateProps = State['mapScreen']

const MapControlsComponent = (props: Props & DispatchProps) => {
  return (
    <div className="bottom-left-control-group">
      <div className="panel">
        <i className="fas fa-dot-circle fa-lg" />
      </div>
    </div>
  )
}

export const MapControls = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(MapControlsComponent)
