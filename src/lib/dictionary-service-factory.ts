import {
  GraphQLDictionaryService,constants, RestDictionaryService
} from '@sitecore-jss/sitecore-jss-vue'
import config from '../temp/config';
import { getGraphQLEndpointFullPath } from './graphql-client-factory/utils';
import clientFactory from './graphql-client-factory/index';

export class DictionaryServiceFactory {

  create(siteContext: any) {
 
  const graphQLEndpoint = getGraphQLEndpointFullPath(config.sitecoreApiHost, config.graphQLEndpoint)
    const siteName = siteContext?.sitecore?.context?.site?.name

   return  config.fetchMethod === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLDictionaryService({
          siteName,
          endpoint: graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          
        })
      : new RestDictionaryService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName,
        });
  }
}
 
 
export const dictionaryServiceFactory = new DictionaryServiceFactory()