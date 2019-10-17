
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
  
  let [bbox, setBbox] = React.useState(config.defaultQuery.bbox)
  let [collection, setCollection] = React.useState(config.defaultQuery.collections[0])

  let [products, setProducts] = React.useState(
    { query: config.defaultQuery, result: [] } as ProductResult
  )

  let [productCountByCollection, setProductCountByCollection] = React.useState(
    { query: config.defaultQuery, result: [] } as ProductCountByCollectionResult
  )

  React.useEffect(() => {

    if (props.collections.length) {
      
      let productQuery = {
        collections: [collection],
        bbox: bbox
      }
        
      let productCountByCollectionQuery = {
        collections: props.collections.map(c => c.collection.name),
        bbox: bbox
      }
        
      Promise.all([
        loadProducts(productQuery),
        loadProductCountByCollection(productCountByCollectionQuery)])
        .then(([products, productCountByCollection]) => {
          setProducts(products)
          setProductCountByCollection(productCountByCollection)
        })
    }    
  }, [props.collections, bbox, collection])

  let currentCollection = props.collections.find(c => c.collection.name === collection)
  let wmsLayer = currentCollection && currentCollection.ogcProduct
    ? currentCollection!.ogcProduct!.data!.product!.wms
    : undefined

  return <MapScreenLayout
    collections={props.collections}
    bbox={bbox}
    wmsLayer={wmsLayer}
    collection={collection}
    setBbox={setBbox}
    products={products.result}
    productCountByCollection={productCountByCollection.result}
    />
}
