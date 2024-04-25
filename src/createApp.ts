import { SitecoreJssPlaceholderPlugin } from "@sitecore-jss/sitecore-jss-vue";
import { createPinia } from "pinia";
import {
  createMetaManager as createVueMetaManager,
  defaultConfig,
} from "vue-meta";
import componentFactory from "./componentFactory";
import SitecoreJssStorePlugin from "./lib/SitecoreJssStorePlugin";
import Equalize from './utils/equalize'

const createMetaManager = () =>
  createVueMetaManager({
    ...defaultConfig,
  });

export default defineNuxtPlugin({
  name: "init",
  enforce: "pre", // or 'post'
  async setup(nuxtApp: any) {
    const app = nuxtApp.vueApp;
    const metaManager = createMetaManager();
    const pinia = createPinia();
    
    app.use(pinia);
    app.use(SitecoreJssStorePlugin);
    app.use(SitecoreJssPlaceholderPlugin, { componentFactory });
    app.use(metaManager);
    app.use(Equalize)
    app.config.errorHandler = (err: any) => {
      console.error("errorHandler", err); // eslint-disable-line no-console
      return false;
    };
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});

