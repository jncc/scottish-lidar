
import React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { Product } from '../../catalog/types'
import { State, MapActions, DispatchProps } from '../../state'
import { useBasket } from '../../basket'

type Props = { 
  product: Product
}
type StateProps = {
  hovered: Product | undefined
}

let ProductListItemComponent = (props: Props & StateProps & DispatchProps) => {

  let [basket, addItemToBasket] = useBasket()

  let isHovered = props.product === props.hovered
  let titleCssClass = isHovered ? 'product-list-item-title-highlight': ''

  let isInBasket = basket.items.some(item => item.productId === props.product.id)
  let inBasketItemCssClass = isInBasket ? 'product-list-item-basket-in' : ''

  return (
    <AnimatePresence>
      <motion.div
        variants={animationVariants}
        exit="hidden"
        positionTransition={{ type: 'tween' }}
        className="product-list-item"
        onMouseOver={() => props.dispatch(MapActions.productHovered(props.product))}
        onMouseOut={() => props.dispatch(MapActions.productUnhovered(props.product))}
        >
        {isHovered &&
        <div className="product-list-item-highlight" />
        }
        <div className={'product-list-item-title ' + titleCssClass} >
          {props.product.data.product.title}
        </div>
        <div className={'product-list-item-basket ' + inBasketItemCssClass}
          onClick={() => addItemToBasket({ productId: props.product.id })}
        >
          <i className="fas fa-shopping-cart" />
        </div>
        {/* {props.product.data.product!.http!.size}
        {props.product.data.product!.http!.type}
        {props.product.data.product!.http!.url} */}
      </motion.div>
    </AnimatePresence>
  )
}

let animationVariants = {
  visible: { opacity: 1, x: 0 },
  hidden : { opacity: 0, x: 80 },
}

export const ProductListItem = reduxConnect(
  (s: State): StateProps => {
    return {
      hovered: s.mapScreen.hovered
    }
  }
)(ProductListItemComponent)
