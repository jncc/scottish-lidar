
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
      
  let [products, setProducts]
    = React.useState({ query: {}, result: [] } as ProductResult)

  let [productCountByCollection, setProductCountByCollection]
    = React.useState({ query: {}, result: [] } as ProductCountByCollectionResult)
    
  React.useEffect(() => {
    if (props.collections.length) { // wait until collections are loaded
      // the two api calls we need to make have the same query
      let query = {
        collections: props.collections.map(c => c.collection.name),
        bbox: config.defaultQuery.bbox
      }
      Promise.all([loadProducts(query), loadProductCountByCollection(query)])
        .then(([products, productCountByCollection]) => {
          setProducts(products)
          setProductCountByCollection(productCountByCollection)
        })
    }    
  }, [props.collections])

  return <MapScreenLayout
    collections={props.collections}
    products={products}
    productCountByCollection={productCountByCollection}
    />
}
