
import React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { Product } from '../../catalog/types'
import { State, MapActions } from '../../state'

type Props = { 
  product: Product
}
type StateProps = {
  hovered: Product | undefined
}
type DispatchProps = {
  productHovered  : (p: Product) => void
  productUnhovered: (p: Product) => void
}

let ProductListItemComponent = (props: Props & StateProps & DispatchProps) => {

  let isHovered = props.product === props.hovered
  let titleCssClass = props.hovered ? 'product-list-item-title-highlight': ''

  return (
    <AnimatePresence>
      <motion.div
        variants={animationVariants}
        exit="hidden"
        positionTransition={{ type: 'tween' }}
        className="product-list-item"
        onMouseOver={() => props.productHovered(props.product)}
        onMouseOut={() => props.productUnhovered(props.product)}
        >
        {isHovered &&
        <div className="product-list-item-highlight" />
        }
        <div className={'product-list-item-title ' + titleCssClass} >
          {props.product.data.product.title}
        </div>
        <div className="product-list-item-cart">
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
  },
  (d: Dispatch): DispatchProps => ({
    productHovered  : (p: Product) => { d(MapActions.productHovered(p)) },
    productUnhovered: (p: Product) => { d(MapActions.productHovered(p)) }
  })
)(ProductListItemComponent)
