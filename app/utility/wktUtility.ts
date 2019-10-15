
export const bboxToWkt = (bbox: [number, number, number, number]) => {
  let [minX, minY, maxX, maxY] = bbox
  return `POLYGON((${minX} ${minY}, ${minX} ${maxY}, ${maxX} ${maxY}, ${maxX} ${minY}, ${minX} ${minY}))`
}
