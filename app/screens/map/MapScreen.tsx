
import * as React from 'react'

import { config } from './config'
import { CollectionTuple } from '../../state'
import { ProductResult, ProductCountByCollectionResult, ProductQuery, Product } from '../../catalog/types'
import { loadProductCountByCollection, loadProducts } from '../../catalog/api'
import { MapScreenLayout } from './MapScreenLayout'
import { bboxToWkt } from '../../utility/geospatialUtility'
import { getOffsetFromPageNumber, PAGE_SIZE } from '../../utility/pagerUtility'
import { MapStoreProvider, useMapStore, Actions } from './store'

type Props = {
  collections: CollectionTuple[]
}

let defaultQuery: ProductQuery = {
  collections: config.defaultQuery.collections,
  footprint: bboxToWkt(config.defaultQuery.bbox),
  spatialop: 'overlaps',
}

export const MapScreen = (props: Props) => {

  let { state, dispatch } = useMapStore()

  let [products, setProducts] = React.useState(
    { query: defaultQuery, result: [] } as ProductResult
  )

  let [productCountByCollection, setProductCountByCollection] = React.useState(
    { query: defaultQuery, result: [] } as ProductCountByCollectionResult
  )

  let [hovered, setHovered] = React.useState<Product | undefined>(undefined)

  // (re)load the products whenever relevant state changes
  React.useEffect(() => {

    // wait for collections to be loaded
    if (props.collections.length) {
      
      let footprint = bboxToWkt(state.bbox)

      let productQuery: ProductQuery = {
        collections: [state.collection],
        footprint,
        offset: getOffsetFromPageNumber(state.page),
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
  }, [props.collections, state.bbox, state.page, state.collection])

  let currentCollection = props.collections.find(c => c.collection.name === state.collection)
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
    bbox={state.bbox}
    setPage={(n) => dispatch(Actions.setPage(n))}
    wmsLayer={wmsLayer}
    collection={state.collection}
    setCollection={(c) => dispatch(Actions.setCollection(c))}
    setBbox={(bbox) => dispatch(Actions.setBbox(bbox))}
    products={products}
    productCountByCollection={productCountByCollection.result}
    hoveredProduct={hovered}
    productHovered={handleProductHovered}
    productUnhovered={handleProductUnhovered}
  />
}
