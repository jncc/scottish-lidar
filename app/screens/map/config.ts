
import { env } from '../../../env'

/** Config for the map */

export const config = {
  defaultZoom: 8,
  maximumZoom: 13,
  defaultCenter: [56.4, -4] as [number, number],
  baseLayerUrlTemplate: `https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg`,
  attribution: `Backdrop &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
  aggregateLayer: {
    baseUrl: env.AGGREGATE_LAYER_BASE_URL,
    layer: `scotland:lidar-aggregate`,
    format: 'image/png',
    opacity: 0.7,
    transparent: true,
  },
  defaultQuery: {
    collections: [`scotland-gov/lidar/phase-1/dsm`],
    bbox:        [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
  },
  defaultQueryResultInfo: {
    bboxArea:    13679,
    total:       0
  }
}
