
export type ParsedCollectionPath = {
  owner  : string  // e.g. `scotland-gov`
  group  : string  // e.g. `lidar/phase-1`
  dataset: string  // e.g. `lidar/phase-1/dsm`
  shortName: string 
}

export function parseCollectionName(collectionName: string): ParsedCollectionPath {

  let segments = collectionName.split('/')

  if (segments.length < 4) {
    throw Error('Collection name must have at least 4 segments.')
  }

  let group = segments[1] + '/' + segments[2]
  let rest = segments.slice(3).join('/') // remainder, just in case there are additional segments in future

  return {
    owner: segments[0],
    group: group,
    dataset : group + '/' + rest,
    shortName: rest
  }
}
