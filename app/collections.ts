
import { parseCollectionName } from './utility/collectionUtility'
import { loadOgcProducts, loadCollections } from './catalog/api'

export let loadAndParseCollections = async () => {

  let [collections, ogcProducts] = await Promise.all([
    loadCollections(),
    loadOgcProducts()
  ])

  let tuples = collections.result
    // discard the "OGC" collection which only exists to catalogue the OGC WMS products
    // (this is just how the catalog data has been structured)
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
