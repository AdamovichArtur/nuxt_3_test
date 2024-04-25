import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      // @sitecore-jss/sitecore-jss-dev-tools does not output valid esm
      "@sitecore-jss/sitecore-jss-dev-tools":
        "@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/index.js",
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
      "@node_modules": path.resolve(__dirname, "node_modules"),
      "@styles": path.resolve(__dirname, "src/assets/styles"),
      "~": path.resolve(__dirname),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
