
import * as React from 'react'

import { config } from './config'
import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult, ProductQuery } from '../../catalog/types'
import { loadProductCountByCollection, loadProducts } from '../../catalog/api'
import { MapScreenLayout } from './MapScreenLayout'
import { bboxToWkt } from '../../utility/geospatialUtility'

type Props = {
  collections: CollectionTuple[]
}

let defaultQuery: ProductQuery = {
  collections: config.defaultQuery.collections,
  footprint: bboxToWkt(config.defaultQuery.bbox),
  // offset: 0,
  // limit: 10,
  spatialop: 'overlaps',
}

export const MapScreen = (props: Props) => {
  
  let [bbox, setBbox] = React.useState(config.defaultQuery.bbox)
  let [collection, setCollection] = React.useState(config.defaultQuery.collections[0])

  let [products, setProducts] = React.useState(
    { query: defaultQuery, result: [] } as ProductResult
  )

  let [productCountByCollection, setProductCountByCollection] = React.useState(
    { query: defaultQuery, result: [] } as ProductCountByCollectionResult
  )

  React.useEffect(() => {

    if (props.collections.length) {
      
      let footprint = bboxToWkt(bbox)

      let productQuery: ProductQuery = {
        collections: [collection],
        footprint,
        // offset: 0, // todo
        // limit: 10,
        spatialop: 'overlaps',
      }
        
      let productCountByCollectionQuery: ProductQuery = {
        collections: props.collections.map(c => c.collection.name),
        footprint,
        // offset: 0,
        // limit: 100000,
        spatialop: 'overlaps'
        // what to offset and limit do here?
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
    setCollection={setCollection}
    setBbox={setBbox}
    products={products}
    productCountByCollection={productCountByCollection.result}
    />
}
