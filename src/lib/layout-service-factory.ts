import {
  LayoutService,
  RestLayoutService,
  GraphQLLayoutService,
  constants
} from '@sitecore-jss/sitecore-jss-vue'
import config from '../temp/config'
import { getGraphQLEndpointFullPath } from './graphql-client-factory/utils';
import clientFactory from './graphql-client-factory/index';

export interface LayoutServiceFactoryType {
  siteName?: any
  apiHost?: string
  isGettingContext?: boolean
}


export class LayoutServiceFactory {
  create(siteContext: any): LayoutService {
    const siteName = siteContext?.sitecore?.context?.site?.name || 'baseshop' 
    const graphQLEndpoint = getGraphQLEndpointFullPath(config.sitecoreApiHost, config.graphQLEndpoint)
   
    return config.fetchMethod === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
        siteName,
        endpoint:graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
          
        
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName,
          configurationName: config.layoutServiceConfigurationName,
        });
  }
      
}

/** LayoutServiceFactory singleton */
export const layoutServiceFactory = new LayoutServiceFactory()
