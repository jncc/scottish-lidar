
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { Product } from '../../catalog/types'
import { AppActions, DispatchProps } from '../../state'
import { BasketItem, makeBasketItemFromProduct } from '../../basket'

type Props = { 
  product: Product
  hovered: Product | undefined
  isInBasket: boolean
  toggleBasketItem: (item: BasketItem) => void
}

let ProductListItemComponent = (props: Props & DispatchProps) => {

  let isHovered = props.product === props.hovered
  let titleCssClass = isHovered ? 'product-list-item-title-highlight': ''

  let inBasketItemCssClass = props.isInBasket ? 'product-list-item-basket-in' : ''

  return (
    <AnimatePresence>
      <motion.div
        variants={animationVariants}
        exit="hidden"
        positionTransition={{ type: 'tween' }}
        className="product-list-item"
        onMouseOver={() => props.dispatch(AppActions.productHovered(props.product))}
        onMouseOut={() => props.dispatch(AppActions.productUnhovered(props.product))}
        >
        {isHovered &&
        <div className="product-list-item-highlight" />
        }
        <div className={'product-list-item-title ' + titleCssClass}>
          <span className="product-list-item-bullet me-1" aria-hidden="true">&bull;</span>
          {props.product.data.product.title}
        </div>
        <div className="product-list-item-size">

        </div>
        <div className={'product-list-item-basket ' + inBasketItemCssClass}
          onClick={() => props.toggleBasketItem(makeBasketItemFromProduct(props.product))}
          onKeyPress={() => props.toggleBasketItem(makeBasketItemFromProduct(props.product))}
          tabIndex={0}
          aria-label={'Add ' + props.product.data.product.title}
        >
          <i className="fas fa-shopping-cart" aria-hidden="true" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

let animationVariants = {
  visible: { opacity: 1, x: 0 },
  hidden : { opacity: 0, x: 80 },
}

export const ProductListItem = reduxConnect()(ProductListItemComponent)
