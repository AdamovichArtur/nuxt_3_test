import { SiteResolver } from '@sitecore-jss/sitecore-jss/site'
import sitesConfig from '../../sites.json'

/*
  The site resolver stores site information and is used in the app
  whenever site lookup is required (e.g. by name in page props factory
  or by host in Next.js middleware).

  By default, the app is single-site (one JSS app per Sitecore site).
  However, multi-site is available with the `nextjs-multisite` add-on.
*/

export const siteResolver = new SiteResolver(sitesConfig || [])
