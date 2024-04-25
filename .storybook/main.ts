
const path = require('path');

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../src/stories/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
 addons: [
    'storybook-addon-nuxt',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/stores': path.resolve(__dirname, "./src/stores"),
      '@': path.resolve(__dirname, "./src"),
    };

    return config;
  }
};
export default config;
