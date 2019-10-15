
/**
 * Helper functions for HTTP fetching from the Catalog API.
 */

import { env } from '../../env'

async function fetchAs<T>(request: Request) {
  let response = await fetch(request)
  if (response.ok) {
    return await response.json() as T
  }  
  throw new Error(`${response.status}. ${response.statusText}`)
}

export async function get<T>(path: string) {
  let request = new Request(env.CATALOG_API_ENDPOINT + path)
  return fetchAs<T>(request)
}

export async function post<T>(path: string, payload: object) {
  let request = new Request(env.CATALOG_API_ENDPOINT + path, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },        
    body: JSON.stringify(payload),
  })
  return fetchAs<T>(request)
}
