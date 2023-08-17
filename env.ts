
// The parcel bundler evaluates build-time environment variables
// and makes them available via the process.env object.
// See https://parceljs.org/env.html

// slightly long-winded way of accessing process.env variables due to
// https://github.com/parcel-bundler/parcel/issues/2191 and related

let NODE_ENV                 = process.env.NODE_ENV as 'development' | 'production'
let CATALOG_API_ENDPOINT     = process.env.CATALOG_API_ENDPOINT
let AGGREGATE_LAYER_BASE_URL = process.env.AGGREGATE_LAYER_BASE_URL
let PAGE_EXTENSION           = process.env.PAGE_EXTENSION
let INDEX_PAGE               = process.env.INDEX_PAGE
let COOKIE_CONSENT_KEY       = process.env.COOKIE_CONSENT_KEY

if (!CATALOG_API_ENDPOINT) {
  throw(`Environment variable CATALOG_API_ENDPOINT is required.`)
}
if (!AGGREGATE_LAYER_BASE_URL) {
  throw(`Environment variable AGGREGATE_LAYER_BASE_URL is required.`)
}
if (PAGE_EXTENSION === null || PAGE_EXTENSION === undefined) {
  throw(`Environment variable PAGE_EXTENSION is required.`)
}
if (INDEX_PAGE === null || INDEX_PAGE === undefined) {
  throw(`Environment variable INDEX_PAGE is required.`)
}

/**
 * Provides the environment variables for the application.
 */
export const env = {
    NODE_ENV,
    CATALOG_API_ENDPOINT,
    AGGREGATE_LAYER_BASE_URL,
    PAGE_EXTENSION,
    INDEX_PAGE,
    COOKIE_CONSENT_KEY
}
