
export const bboxToWkt = (bbox: [number, number, number, number]) => {
  let [minX, minY, maxX, maxY] = bbox
  return `POLYGON((${minX} ${minY}, ${minX} ${maxY}, ${maxX} ${maxY}, ${maxX} ${minY}, ${minX} ${minY}))`
}

/** Converts [minX, minY, maxX, maxY] to [[minY, minX], [maxY, maxX]]. */
export function bboxFlatArrayToCoordArray(bbox: number[]): [[number, number], [number, number]] {
  let [minX, minY, maxX, maxY] = bbox
  return [[minY, minX], [maxY, maxX]]
}
