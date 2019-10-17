
import * as React from 'react'

import { config } from './config'
import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult } from '../../catalog/types'
import { loadProductCountByCollection, loadProducts } from '../../catalog/api'
import { MapScreenLayout } from './MapScreenLayout'

type Props = {
  collections: CollectionTuple[]
}

export const MapScreen = (props: Props) => {
  
  let [currentBbox, setCurrentBbox] = React.useState(config.defaultQuery.bbox)
  let [currentCollection, setCurrentCollection] = React.useState(config.defaultQuery.collections[0])

  let [products, setProducts] = React.useState(
    { query: config.defaultQuery, result: [] } as ProductResult
  )

  let [productCountByCollection, setProductCountByCollection] = React.useState(
    { query: config.defaultQuery, result: [] } as ProductCountByCollectionResult
  )

  React.useEffect(() => {

    if (props.collections.length) {
      
      let productQuery = {
        collections: [currentCollection],
        bbox: currentBbox
      }
        
      let productCountByCollectionQuery = {
        collections: props.collections.map(c => c.collection.name),
        bbox: currentBbox
      }
        
      Promise.all([
        loadProducts(productQuery),
        loadProductCountByCollection(productCountByCollectionQuery)])
        .then(([products, productCountByCollection]) => {
          setProducts(products)
          setProductCountByCollection(productCountByCollection)
        })
    }    
  }, [props.collections, currentBbox, currentCollection])

  return <MapScreenLayout
    collections={props.collections}
    currentBbox={currentBbox}
    currentCollection={currentCollection}
    products={products.result}
    productCountByCollection={productCountByCollection.result}
    />
}
