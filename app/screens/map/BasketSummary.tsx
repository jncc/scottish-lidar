
import * as React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State } from '../../state'
import { ProductResult } from '../../catalog/types'
import { useBasket } from '../../basket'

type Props = {
  // collections: CollectionTuple[]
  // products: ProductResult
  // productCountByCollection: { collectionName: string, products: number }[]
}

type StateProps = State['mapScreen']

const BasketSummaryComponent = (props: Props & StateProps) => {

  let [basket] = useBasket()

  return (
    <div className="panel">
      <div>
      <i className="fas fa-shopping-cart" />
      </div>
      <div>
        {basket.items.length}
      </div>
    </div>
  )
}

export const BasketSummary = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(BasketSummaryComponent)
