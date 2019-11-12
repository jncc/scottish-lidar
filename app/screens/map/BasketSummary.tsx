
import * as React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State } from '../../state'
import { ProductResult } from '../../catalog/types'
import { useBasket } from '../../basket'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {
  // collections: CollectionTuple[]
  // products: ProductResult
  // productCountByCollection: { collectionName: string, products: number }[]
}

type StateProps = State['mapScreen']

const BasketSummaryComponent = (props: Props & StateProps) => {

  let [basket, toggleItem, removeAll] = useBasket()

  return (
    <div className="panel basket-summary">
      <div>
        <Link to={{ pathname: '/download' }} className="btn btn-primary">
          Download
        </Link>
      </div>
      <div>
        <Button onClick={() => removeAll()} variant="secondary">Clear</Button>
      </div>
      <div className="basket-summary-stretchy">
      </div>
      <div className="basket-summary-count">
        <span className="float-right badge badge-pill badge-primary">
          {basket.items.length}
        </span>
      </div>
      <div>
        <i className="fas fa-shopping-cart fa-2x" />
      </div>
    </div>
  )
}

export const BasketSummary = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(BasketSummaryComponent)
