
export type ParsedCollectionName = {
  Owner  : string  // e.g. `scotland-gov`
  Group  : string  // e.g. `lidar/phase-1`
  Dataset: string  // e.g. `lidar/phase-1/dsm`
}

export function parseCollectionName(collectionName: string): ParsedCollectionName {

  let segments = collectionName.split('/')

  if (segments.length < 4) {
    throw Error('Collection name must have at least 4 segments.')
  }

  let group = segments[1] + '/' + segments[2]
  let rest = segments.slice(3).join('/') // remainder, just in case there are additional segments in future

  return {
    Owner: segments[0],
    Group: group,
    Dataset : group + '/' + rest
  }
}
