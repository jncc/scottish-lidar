
import { orderBy } from 'lodash'
import { parseCollectionName } from './utility/collectionUtility'
import { loadOgcProducts, loadCollections } from './catalog/api'

export let loadAndParseCollections = async () => {

  let [collections, ogcProducts] = await Promise.all([
    loadCollections(),
    loadOgcProducts()
  ])

  // first, order sensibly for the UI - we want to ensure the phase-1 datasets are at the top
  let tuples = orderBy(collections.result, [c => !c.name.startsWith('scotland-gov/lidar/phase-'), c => c.name])
    // discard the "OGC" collection which only exists to catalogue the OGC WMS "products"
    // (this is just an fact of how the catalog data has been structured in the database)
    .filter(c => !c.name.endsWith('/ogc'))
    // create a tuple of { collection, path, OGC product }
    .map(c => {
      // each collection has a corresponding OGC product
      // `scotland-gov/lidar/phase-1/dtm` (collection name)
      // `scotland-gov-lidar-phase-1-dtm` (OGC product name)
      let ogcProductName = c.name.replace(new RegExp('\/', 'g'), '-')
      return {
        collection: c,
        path: parseCollectionName(c.name),
        ogcProduct: ogcProducts.result.find(p => p.name === ogcProductName)
      }
    })
  
  return tuples
}
