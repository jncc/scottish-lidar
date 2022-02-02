
import { env } from '../../../env'

/** Config for the map */

export const config = {
  defaultZoom: 7,
  maximumZoom: 13,
  defaultCenter: [56.4, -4] as [number, number],
  baseLayerUrlTemplate: `https://tile.viaeuropa.uk.com/osmao-scotg-ov012-a8f54/m0335/{z}/{x}/{y}.png`,
  attribution: `Base mapping from viaEuropa. © Crown copyright and database right (2021). Ordnance Survey (OS Licence number 100024655)`,
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
