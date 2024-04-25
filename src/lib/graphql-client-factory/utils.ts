import parse from 'url-parse'
 
export const getGraphQLEndpointFullPath = (sitecoreApiHost: string, api: string) => {
    // ssr render request sitecoreApiHost: SITECORE_API_HOST .env file 
    console.log(parse(api).hostname)
    if (!parse(api).hostname) {
        return sitecoreApiHost + api
    }
    // client request
    return api
}