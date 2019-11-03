
import React from 'react'
import { Product } from '../../catalog/types'
import { motion, AnimatePresence } from 'framer-motion'

type Props = { 
  product: Product
  hovered: boolean
  productHovered: (p: Product) => void
  productUnhovered: (p: Product) => void
}

export const ProductListItem = (props: Props) => {

  let titleCssClass = props.hovered ? 'product-list-item-title-highlight': ''

  return (
    <AnimatePresence>
      <motion.div variants={animationVariants}
        exit="hidden"
        positionTransition={{ type: 'tween' }}
        className="product-list-item"
        onMouseOver={() => props.productHovered(props.product)}
        onMouseOut={() => props.productUnhovered(props.product)}
        >
        {props.hovered &&
        <div className="product-list-item-highlight" />
        }
        <div
          className={'product-list-item-title ' + titleCssClass}
          
        >
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
  hidden: { opacity: 0, x: 80 },
}
