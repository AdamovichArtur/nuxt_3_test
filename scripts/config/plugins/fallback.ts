import type { JssConfig } from '@/lib/config';
import type { ConfigPlugin } from '..';

/**
 * This config will set fallback values for properties that were left empty
 * If neither env, nor other places had a proper value, this will ensure a fallback is set
 */

export const getPublicUrl = (): string => {
  let url = process.env.PUBLIC_URL;

  if (url === undefined) {
    if (process.env.NETLIFY && process.env.DEPLOY_URL) return process.env.DEPLOY_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    url = 'http://localhost:3000';
  }

  // Ensure no trailing slash
  return url.replace(/\/$/, '');
};
class FallbackPlugin implements ConfigPlugin {
  // should always come last
  order = 100;

  async exec(config: JssConfig) {
    return Object.assign({}, config, {
      defaultLanguage: config.defaultLanguage || 'en',
      sitecoreApiKey: config.sitecoreApiKey || 'no-api-key-set',
      layoutServiceConfigurationName: config.layoutServiceConfigurationName || 'default',
      publicUrl: config.publicUrl || getPublicUrl(),
    });
  }
}

export const fallbackPlugin = new FallbackPlugin();
