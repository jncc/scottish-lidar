
/**
 * Functions that return data from the Catalog API.
 */

import { get, post } from './methods'
import { SearchCollectionsResult, SearchProductsResult } from './types'
import { bboxToWkt } from '../utility/wktUtility'

export async function loadCollections() {
  return await get<SearchCollectionsResult>('/search/collection/scotland-gov/*')
}

export async function loadOgcProducts() {
  return await post<SearchProductsResult>('/search/product', {
    collections: ['scotland-gov/lidar/ogc']
  })
}

export type LoadProductCountByCollectionQuery = {
  collections: string[],
  bbox: [number, number, number, number],
}

export async function loadProductCountByCollection(query: LoadProductCountByCollectionQuery) {
  return await post<any[]>('/search/product/countByCollection', {
    collections: query.collections,
    footprint: bboxToWkt(query.bbox),
    spatialOp: 'overlaps',
  })
}
