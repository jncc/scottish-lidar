
// The parcel bundler evaluates build-time environment variables
// and makes them available via the process.env object.
// See https://parceljs.org/env.html

/**
 * Provides the environment variables for the application.
 */
export const env = {
    NODE_ENV                : process.env.NODE_ENV as 'development' | 'production',
    CATALOG_API_ENDPOINT    : process.env.CATALOG_API_ENDPOINT,
    AGGREGATE_LAYER_BASE_URL: process.env.AGGREGATE_LAYER_BASE_URL,
    PAGE_EXTENSION          : process.env.PAGE_EXTENSION,
    INDEX_PAGE              : process.env.INDEX_PAGE,
}
