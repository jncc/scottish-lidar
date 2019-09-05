
// The parcel bundler makes environment variables available
// **in the browser** at runtime via the `process.env` object.
// See https://parceljs.org/env.html

/**
 * Provides the environment variables.
 */
export const env = {
    NODE_ENV:             process.env.NODE_ENV as 'development' | 'production',
    CATALOG_API_ENDPOINT: process.env.CATALOG_API_ENDPOINT,
    PAGE_EXTENSION:   process.env.PAGE_EXTENSION,
    INDEX_PAGE:       process.env.INDEX_PAGE,
}
