
import { ProductQuery } from '../../catalog/types'

/** Config for the map */

export const config = {
  defaultZoom: 7,
  maximumZoom: 13,
  defaultCenter: [56.4, -4] as [number, number],
  baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
  attribution: `Backdrop &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
  aggregateLayer: {
    baseUrl: `https://srsp-ows.jncc.gov.uk/scotland/wms`,
    layer: `scotland:lidar-aggregate`,
    format: 'image/png',
    opacity: 0.7,
    transparent: true,
  },
  defaultQuery: {
    collections: [`scotland-gov/lidar/phase-1/dsm`],
    // collections: [`7d96723a-49c9-4d17-8df1-2a96932112d4`], // Phase 1 DSM collection
    // bbox:        [-3.6, 56.65, -3.5, 56.7] as [number, number, number, number],
    bbox:        [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number],
  },
  defaultQueryResultInfo: {
    bboxArea:    13679,
    total:       0
  }
}
