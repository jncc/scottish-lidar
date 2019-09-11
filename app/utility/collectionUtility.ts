
export interface ParsedCollectionName {
  Owner: string  // e.g. `scotland-gov`
  Group: string  // e.g. `lidar/phase-1`
  Name : string  // e.g. `dsm`
}

export function parseCollectionName(collectionName: string): ParsedCollectionName {

  let segments = collectionName.split('/')

  if (segments.length < 4) {
    throw Error('Collection name must have at least 4 segments.')
  }

  return {
    Owner: segments[0],
    Group: segments[1] + '/' + segments[2],
    Name : segments.slice(3).join('/') // remainder, just in case there are additional segments in future
  }
}
