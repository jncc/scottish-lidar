
/**
 * Functions to return data from the Catalog API.
 */

import { get, post } from './methods'
import {
  CollectionResult, ProductResult,
  ProductQuery, ProductCountByCollectionResult } from './types'
import { bboxToWkt } from '../utility/geospatialUtility'

export async function loadCollections() {
  return await get<CollectionResult>('/search/collection/scotland-gov/*')
}

export async function loadOgcProducts() {
  return await post<ProductResult>('/search/product', {
    collections: ['scotland-gov/lidar/ogc']
  })
}

export async function loadProducts(query: ProductQuery) {
  return await post<ProductResult>('/search/product', {
    collections: query.collections,
    footprint: bboxToWkt(query.bbox),
    spatialOp: 'overlaps',
  })
}

export async function loadProductCountByCollection(query: ProductQuery) {
  return await post<ProductCountByCollectionResult>('/search/product/countByCollection', {
    collections: query.collections,
    footprint: bboxToWkt(query.bbox),
    spatialOp: 'overlaps',
  })
}
