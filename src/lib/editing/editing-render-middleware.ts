import { AxiosDataFetcher} from '@sitecore-jss/sitecore-jss';
import { parse } from 'node-html-parser';
import type { EditingData } from './editing-data';
import { editingDataService } from './editing-data-service';
import type { EditingDataService } from './editing-data-service';
import {
  QUERY_PARAM_EDITING_SECRET,
  QUERY_PARAM_PROTECTION_BYPASS_SITECORE,
  QUERY_PARAM_PROTECTION_BYPASS_VERCEL,
} from './constants';
import { getJssEditingSecret } from '../utils/utils';
import { readBody } from 'h3';
import type { H3Event, EventHandlerRequest } from "h3";

export interface EditingRenderMiddlewareConfig {
  
  dataFetcher?: AxiosDataFetcher;  
  editingDataService?: EditingDataService;  
  resolvePageUrl?: (serverUrl: string, itemPath: string) => string;  
  resolveServerUrl?: (event: H3Event<EventHandlerRequest>) => string;
}

export class EditingRenderMiddleware {
  private editingDataService: EditingDataService;
  private dataFetcher: AxiosDataFetcher;
  private resolvePageUrl: (serverUrl: string, itemPath: string) => string;
  private resolveServerUrl: (event: H3Event<EventHandlerRequest>) => string;
  
  constructor(config?: EditingRenderMiddlewareConfig) {
  

    this.editingDataService = config?.editingDataService ?? editingDataService;
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher();
    this.resolvePageUrl = config?.resolvePageUrl ?? this.defaultResolvePageUrl;
    this.resolveServerUrl = config?.resolveServerUrl ?? this.defaultResolveServerUrl;
  }
  
  public getHandler(): (event: H3Event<EventHandlerRequest>) => Promise<void> {
    return this.handler;
  }
 
  protected getQueryParamsForPropagation = (
    query: any
  ): { [key: string]: string } => {
    const params: { [key: string]: string } = {};
    if (query[QUERY_PARAM_PROTECTION_BYPASS_SITECORE]) {
      params[QUERY_PARAM_PROTECTION_BYPASS_SITECORE] = query[
        QUERY_PARAM_PROTECTION_BYPASS_SITECORE
      ] as string;
    }
    if (query[QUERY_PARAM_PROTECTION_BYPASS_VERCEL]) {
      params[QUERY_PARAM_PROTECTION_BYPASS_VERCEL] = query[
        QUERY_PARAM_PROTECTION_BYPASS_VERCEL
      ] as string;
    }
    return params;
  };

  private handler = async (event: H3Event<EventHandlerRequest>): Promise<any> => {

    const body = await readBody(event, {strict: true});
    const query = getQuery(event)
    const { method } = event; 

    const startTimestamp = Date.now();

    if (method !== 'POST') {
      event.node.res.setHeader('Allow', 'POST');
      event.node.res.statusCode = 405;
      return {
        html: `<html><body>Invalid request method '${method}'</body></html>`,
      };
    }

    // Validate secret
    const secret = query[QUERY_PARAM_EDITING_SECRET] ?? body?.jssEditingSecret;
    if (secret !== getJssEditingSecret()) {
      console.error(
        'invalid editing secret - sent "%s" expected "%s"',
        secret,
        getJssEditingSecret()
      );
      event.node.res.statusCode = 401;
      return {
        html: '<html><body>Missing or invalid secret</body></html>',
      };
    }

    try {
      // Extract data from EE payload
      const editingData = extractEditingData(body);

      // Resolve server URL
      const serverUrl = this.resolveServerUrl(event);

      // Get query string parameters to propagate on subsequent requests (e.g. for deployment protection bypass)
      const params = this.getQueryParamsForPropagation(query);

      // Stash for use later on (i.e. within getStatic/ServerSideProps).
      // Note we can't set this directly in setPreviewData since it's stored as a cookie (2KB limit)
      const previewData = await this.editingDataService.setEditingData(
        editingData,
        serverUrl,
        params
      );

      // Grab the preview cookies to send on to the render request
      const cookies = event.node.req.headers['Set-Cookie'] as string[] || [];
      cookies.push(`previewData=${previewData.key}`)

      // Make actual render request for page route, passing on preview cookies as well as any approved query string parameters.
      // Note timestamp effectively disables caching the request in Axios (no amount of cache headers seemed to do it)
      const requestUrl = new URL(this.resolvePageUrl(serverUrl, editingData.path));
      for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
          requestUrl.searchParams.append(key, params[key]);
        }
      }
      requestUrl.searchParams.append('timestamp', Date.now().toString());
      const pageRes = await this.dataFetcher
        .get<string>(requestUrl.toString(), {
          headers: {
            Cookie: cookies.join(';'),
          },
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });

      let html = pageRes.data;
      console.log('html', html)
      if (!html || html.length === 0) {
        throw new Error(`Failed to render html for ${editingData.path}`);
      }

      // replace phkey attribute with key attribute so that newly added renderings
      // show correct placeholders, so save and refresh won't be needed after adding each rendering
      html = html.replace(new RegExp('phkey', 'g'), 'key');

      if (editingData.layoutData.sitecore.context.renderingType === "component") {
        // Handle component rendering. Extract component markup only
        html = parse(html).getElementById("editing-component")?.innerHTML || "";
        if (!html) throw new Error(`Failed to render component for ${editingData.path}`);
      }

      const responseBody = { html };

      // Return expected JSON result
      event.node.res.statusCode = 200;
      return responseBody;
    } catch (err) {
      const error = err as Record<string, unknown>;
      console.error(error);

      if (error.response || error.request) {
        // Axios error, which could mean the server or page URL isn't quite right, so provide a more helpful hint
        console.info(
          "Hint: for non-standard server or Nuxt route configurations, you may need to override the 'resolveServerUrl' or 'resolvePageUrl' available on the 'EditingRenderMiddleware' config."
        );
      }
      event.node.res.statusCode = 500;
      return {
        html: `<html><body>${error}</body></html>`,
      };
    }
  };

  private defaultResolvePageUrl = (serverUrl: string, itemPath: string) => {

    
    return `${serverUrl}/editing${itemPath}`;
  };

  private defaultResolveServerUrl = (event: H3Event<EventHandlerRequest>) => {
    return `${process.env.VERCEL ? 'https' : 'http'}://${event.headers.get('Host')}`;
  };
}

export function extractEditingData(payload: any): EditingData {
  if (!payload || !payload.args || !Array.isArray(payload.args) || payload.args.length < 3) {
    throw new Error(
      'Unable to extract editing data from request.'
    );
  }

  const layoutData = JSON.parse(payload.args[1]);
  const viewBag = JSON.parse(payload.args[2]);
  // Keep backwards compatibility in case people use an older JSS version that doesn't send the path in the context
  const path = layoutData.sitecore.context.itemPath ?? viewBag.httpContext.request.path;
  console.log('path', path, layoutData)
  return {
    path,
    layoutData,
    language: viewBag.language,
    dictionary: viewBag.dictionary,
  };
}