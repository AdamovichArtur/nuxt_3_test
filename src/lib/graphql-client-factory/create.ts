import {
  GraphQLRequestClientFactoryConfig,
  GraphQLRequestClient,GraphQLLayoutService
} from '@sitecore-jss/sitecore-jss/graphql';
import { JssConfig } from 'lib/config';

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @param config jss config
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = (config: JssConfig) => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (config.graphQLEndpoint && config.sitecoreApiKey) {
    const graphQLEndpoint = config.sitecoreApiHost + config.graphQLEndpoint
  
    clientConfig = {
      endpoint: graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
    };
  } else {
    throw new Error('Please configure your graphQLEndpoint and sitecoreApiKey.');
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};
