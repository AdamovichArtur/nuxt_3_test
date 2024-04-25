import sites from './sites.json';
import { fileURLToPath } from "url";


export default defineNuxtConfig({
  srcDir: "src",
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt',"nuxt-lodash" ],
  plugins: [
    './src/createApp.ts',
  ],
  lodash: { prefix: ""},
  
  i18n: {
    locales: sites.map((site) => site.language),
    strategy: "prefix_and_default",
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    vueI18n: './src/i18n.config.ts'
  },
  alias: {
    "@node_modules": fileURLToPath(new URL('./node_modules', import.meta.url)),
    "@fonts":  fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
    "@styles":  fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
  }, 
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
    },
  },
  vite: {
    server: {
        proxy: {
        //generic sitecore path
        '/sitecore/': {
          target: process.env.SITECORE_API_HOST,
          secure: false,
          changeOrigin: true
      },

      //generic api path
      '/api/': {
        target: process.env.SITECORE_API_HOST,
        secure: false,
        changeOrigin: true
      },

      //media path
      '/-/': {
        target: process.env.SITECORE_API_HOST,
        secure: false,
        changeOrigin: true
      }
    }
  },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:  `
          @import '~/assets/styles/skins/branded.scss';
          @import 'foundation-sites/scss/foundation';
        `
        }
      }
    },
    build: {
      commonjsOptions: {
        include: ["**/*.js"]
      }
    }
  }
})