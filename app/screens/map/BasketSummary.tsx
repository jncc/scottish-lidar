
import * as React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { State, DispatchProps, AppActions } from '../../state'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BasketSummaryCount } from './BasketSummaryCount'

const BasketSummaryComponent = (props: State & DispatchProps) => {

  return (
    <div className="panel basket-summary">
      <div>
        <Link to={{ pathname: '/download' }} className="btn btn-primary">
          Download
        </Link>
      </div>
      <div>
        <Button onClick={() => props.dispatch(AppActions.removeAll())} variant="light">Clear</Button>
      </div>
      <div className="basket-summary-stretchy">
      </div>
      <BasketSummaryCount count={props.basket.length} />
      <div>
        <i className="fas fa-shopping-cart fa-2x" aria-hidden="true" />
      </div>
    </div>
  )
}

export const BasketSummary = reduxConnect(
  (s: State): State => {
    return s  
  }
)(BasketSummaryComponent)
