
import * as React from 'react'
import { connect as reduxConnect } from 'react-redux'

import { config } from './config'
import { CollectionTuple, State } from '../../state'
import { ProductResult, ProductCountByCollectionResult, ProductQuery, Product } from '../../catalog/types'
import { loadProductCountByCollection, loadProducts } from '../../catalog/api'
import { MapScreenLayout } from './MapScreenLayout'
import { bboxToWkt } from '../../utility/geospatialUtility'
import { getOffsetFromPageNumber, PAGE_SIZE } from '../../utility/pagerUtility'

type Props = {
  collections: CollectionTuple[]
}
type StateProps = State['mapScreen']

let defaultQuery: ProductQuery = {
  collections: config.defaultQuery.collections,
  footprint: bboxToWkt(config.defaultQuery.bbox),
  spatialop: 'overlaps',
}

const MapScreenComponent = (props: Props & StateProps) => {

  let [products, setProducts] = React.useState(
    { query: defaultQuery, result: [] } as ProductResult
  )

  let [productCountByCollection, setProductCountByCollection] = React.useState(
    { query: defaultQuery, result: [] } as ProductCountByCollectionResult
  )

  // (re)load the products whenever relevant state changes
  React.useEffect(() => {

    // wait for collections to be loaded
    if (props.collections.length) {
      
      let footprint = bboxToWkt(props.bbox)

      let productQuery: ProductQuery = {
        collections: [props.collection],
        footprint,
        offset: getOffsetFromPageNumber(props.page),
        limit: PAGE_SIZE,
        spatialop: 'intersects',
      }
        
      let productCountByCollectionQuery: ProductQuery = {
        collections: props.collections.map(c => c.collection.name),
        footprint,
        spatialop: 'intersects'
      }
        
      Promise.all([
        loadProducts(productQuery),
        loadProductCountByCollection(productCountByCollectionQuery)])
        .then(([products, productCountByCollection]) => {
          setProducts(products)
          setProductCountByCollection(productCountByCollection)
        })
    } 
  }, [props.collections, props.bbox, props.page, props.collection])

  return <MapScreenLayout
    collections={props.collections}
    products={products}
    productCountByCollection={productCountByCollection.result}
  />
}

export const MapScreen = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  }
)(MapScreenComponent)
