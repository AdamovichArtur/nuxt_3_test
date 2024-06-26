import axios from 'axios'
import config from './temp/config'

/**
 * Implements a data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */

export function dataFetcher<T = any>(
  url: string,
  data?: unknown,
  siteName?: string,
  isDelete?: boolean
): Promise<T> {

  return axios({
    url,
    method: isDelete ? 'DELETE' : data ? 'POST' : 'GET',
    data,
    // note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
    // which is necessary for analytics and such
    withCredentials: true,
    headers: {
      sc_apikey: config.sitecoreApiKey,
      sc_site: siteName ? siteName : config.sitecoreSiteName
    }
  }).then((response) => response.data as T)
}
