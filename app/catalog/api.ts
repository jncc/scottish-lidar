
/**
 * Functions that return data from the Catalog API.
 */

import { get, post } from './helpers'
import { SearchCollectionsResult, SearchProductsResult } from './types'

export async function loadCollections() {
  return await get<SearchCollectionsResult>('/search/collection/scotland-gov/*')
}

export async function loadOgcProducts() {
  return await post<SearchProductsResult>('/search/product', {
    'collections': ['scotland-gov/lidar/ogc']
  })
}
