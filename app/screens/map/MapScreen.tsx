
import * as React from 'react'

import { config } from './config'
import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult, ProductQuery, Product } from '../../catalog/types'
import { loadProductCountByCollection, loadProducts } from '../../catalog/api'
import { MapScreenLayout } from './MapScreenLayout'
import { bboxToWkt } from '../../utility/geospatialUtility'
import { getOffsetFromPageNumber, PAGE_SIZE } from '../../utility/pagerUtility'

type Props = {
  collections: CollectionTuple[]
}

let defaultQuery: ProductQuery = {
  collections: config.defaultQuery.collections,
  footprint: bboxToWkt(config.defaultQuery.bbox),
  spatialop: 'overlaps',
}

export const MapScreen = (props: Props) => {
  
  let [page, setPage] = React.useState(1)
  let [bbox, setBbox] = React.useState(config.defaultQuery.bbox)

  let [collection, setCollection] = React.useState(config.defaultQuery.collections[0])

  let [products, setProducts] = React.useState(
    { query: defaultQuery, result: [] } as ProductResult
  )

  let [productCountByCollection, setProductCountByCollection] = React.useState(
    { query: defaultQuery, result: [] } as ProductCountByCollectionResult
  )

  let [hovered, setHovered] = React.useState<Product | undefined>(undefined)

  React.useEffect(() => {

    if (props.collections.length) {
      
      let footprint = bboxToWkt(bbox)

      let productQuery: ProductQuery = {
        collections: [collection],
        footprint,
        offset: getOffsetFromPageNumber(page),
        limit: PAGE_SIZE,
        spatialop: 'intersects',
      }
        
      let productCountByCollectionQuery: ProductQuery = {
        collections: props.collections.map(c => c.collection.name),
        footprint,
        // offset: 0,
        // limit: 100000,
        // todo: what do offset and limit do here?
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
  }, [props.collections, bbox, page, collection])

  let currentCollection = props.collections.find(c => c.collection.name === collection)
  let wmsLayer = currentCollection && currentCollection.ogcProduct
    ? currentCollection!.ogcProduct!.data!.product!.wms
    : undefined
    
  let handleProductHovered = (p: Product) => {
    setHovered(p) 
  }
  let handleProductUnhovered = (p: Product) => {
    // only unset the hovered product if the supplied product is currently the hovered product
    setHovered((prev) => {
      if (prev === p) {
        return undefined
      }
    }) 
  }

  return <MapScreenLayout
    collections={props.collections}
    bbox={bbox}
    setPage={setPage}
    wmsLayer={wmsLayer}
    collection={collection}
    setCollection={setCollection}
    setBbox={setBbox}
    products={products}
    productCountByCollection={productCountByCollection.result}
    hoveredProduct={hovered}
    productHovered={handleProductHovered}
    productUnhovered={handleProductUnhovered}
  />
}
