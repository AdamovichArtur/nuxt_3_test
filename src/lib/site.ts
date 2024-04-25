import { siteResolver } from './site-resolver'

export class SitePlugin {
  create(host: string) {
    const siteContext = siteResolver.getByHost(host)

    return {
      sitecore: {
        context: {
          site: siteContext
        }
      }
    }
  }
}

export const sitePlugin = new SitePlugin()
