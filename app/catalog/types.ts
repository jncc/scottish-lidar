
/**
 * Type definitions for the Catalog API.
 */

export type CollectionResult = {
  query: any
  result: Collection[]
}

export type ProductQuery = {
  offset?: number
  limit?: number
  collections: string[]
  footprint: string
  spatialop: string
  // terms?: ITerm[]
  // types?: any
  // productName?: string
}

export type ProductResult = {
  query: ProductQuery
  result: Product[]
}  

export type ProductCountByCollectionResult = {
  query: ProductQuery
  result: { collectionName: string, products: number }[]
}

export type Collection = {
  id            : string
  name          : string
  metadata      : Metadata
  productsSchema: any
  footprint     : Footprint
}

export type Footprint = {
  type: string
  coordinates: number[][] | number[][][]
  crs: Crs
}

export type Crs = {
  type: string
  properties: any
}

export type Metadata = {
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

export type Keyword = {
  value : string
  vocab?: string
}

export type TemporalExtent = {
  begin: string
  end  : string
}

export type ResponsibleParty = {
  name : string
  email: string
  role : string
}

export type Extent = {
  value    : string
  authority: string
}

export type BoundingBox = {
  north: number
  south: number
  east : number
  west : number
}

export type Product = {
  id            : string
  name          : string
  collectionName: string
  metadata      : Metadata
  properties    : Properties
  data          : Data
  footprint     : Footprint
}

export type Properties = {
  [x: string]: any;
}

export type Data = {
  product: DataGroup
  [x: string]: DataGroup
}

export type DataGroup = {
  title: String
  s3?: S3file
  ftp?: FTP
  http?: HTTP
  wms?: WMS
  wfs?: WFS
}

export type S3file = {
  key: string;
  bucket: string;
  region: string;
  size?: number;
  type?: string;
}

export type FTP = {
  server: string;
  path: string;
  size?: number;
  type?: string;
}

export type HTTP = {
  url: string;
  size?: number;
  type?: string;
}

export type OGC = {
  url: string;
  name: string;
}

export interface WMS extends OGC { }
export interface WFS extends OGC { }
