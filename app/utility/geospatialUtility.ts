
export const bboxToWkt = (bbox: [number, number, number, number]) => {
  let [minX, minY, maxX, maxY] = bbox
  return `POLYGON((${minX} ${minY}, ${minX} ${maxY}, ${maxX} ${maxY}, ${maxX} ${minY}, ${minX} ${minY}))`
}

/** Converts [minX, minY, maxX, maxY] to [[minY, minX], [maxY, maxX]]. */
export function bboxFlatArrayToCoordArray(bbox: number[]): [[number, number], [number, number]] {
  let [minX, minY, maxX, maxY] = bbox
  return [[minY, minX], [maxY, maxX]]
}

// /** Ensures the value is either already an array, else makes it into  a singleton array. */
// export function ensureArray<T>(input: T | T[]) {
//   if (Array.isArray(input)) {
//       return input
//   } else {
//       return [input]
//   }
// }
