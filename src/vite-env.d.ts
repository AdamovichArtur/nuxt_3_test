/// <reference types="vite/client" />
/// <reference path="../plugins/vite-plugin-jss-config/client.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_SITECORE_API_KEY: string
  readonly VITE_SITECORE_API_HOST: string
  readonly VITE_GRAPH_QL_ENDPOINT: string
  readonly VITE_DEFAULT_LANGUAGE: string
  readonly VITE_FETCH_WITH: string
  readonly VITE_PROXY_PORT: string
  readonly VITE_DEBUG: string
  readonly VITE_JSS_MODE: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
