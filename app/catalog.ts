
import { env } from '../env'

async function fetchAs<T>(request: Request) {
  let response = await fetch(request)
  if (response.ok) {
    return await response.json() as T
  }  
  throw new Error(`${response.status}. ${response.statusText}`)
}

export async function getCollections() {
  return await fetchAs<GetCollectionsResult>(
    new Request(env.CATALOG_API_ENDPOINT + '/search/collection/scotland-gov/*')
  )
}

// let request = new Request(env.CATALOG_API_ENDPOINT + '', {
//   method: 'post',
//   body: JSON.stringify({ foo: 'bar' })
// })

// Types for the Catalog API.

export interface GetCollectionsResult {
  query: any
  result: Collection[]
}

export interface Collection {
  id            : string
  name          : string
  metadata      : Metadata
  productsSchema: any
  footprint     : Footprint
}

export interface Footprint {
  type: string
  coordinates: number[][] | number[][][]
  crs: Crs
}

export interface Crs {
  type: string
  properties: any
}

export interface Metadata {
  title                      : string
  abstract                   : string
  topicCategory              : string
  keywords                   : Keyword[]
  temporalExtent             : TemporalExtent
  datasetReferenceDate       : string
  lineage                    : string
  resourceLocator            : string
  additionalInformationSource: string
  dataFormat                 : string
  responsibleOrganisation    : ResponsibleParty
  limitationsOnPublicAccess  : string
  useConstraints             : string
  spatialReferenceSystem     : string
  extent                     : Extent[]
  metadataDate               : string
  metadataPointOfContact     : ResponsibleParty
  resourceType               : string
  boundingBox                : BoundingBox
}

export interface Keyword {
  value : string
  vocab?: string
}

export interface TemporalExtent {
  begin: string
  end  : string
}

export interface ResponsibleParty {
  name : string
  email: string
  role : string
}

export interface Extent {
  value    : string
  authority: string
}

export interface BoundingBox {
  north: number
  south: number
  east : number
  west : number
}
