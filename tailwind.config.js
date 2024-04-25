/** @type {import('tailwindcss').Config} */
import borderWidth from "./src/assets/tailwind-config/borderWidth.js";
import content from "./src/assets/tailwind-config/content.js";
import colors from "./src/assets/tailwind-config/colors.js";
import fontSize from "./src/assets/tailwind-config/fontSize.js";
import fontWeight from "./src/assets/tailwind-config/fontWeight.js";
import grid from "./src/assets/tailwind-config/grid.js";
import lineHeight from "./src/assets/tailwind-config/lineHeight.js";
import listStyle from "./src/assets/tailwind-config/listStyle.js";
module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/pages/**/*.vue",
    "./src/app.vue",
    "./src/Layout.vue",
    "./src/NotFound.vue",
  ],
  corePlugins: {
    aspectRatio: false,
  },
  presets: [
    content,
    colors,
    fontSize,
    fontWeight,
    lineHeight,
    listStyle,
    grid,
    borderWidth,
  ],
  theme: {
    extend: {
      colors: {
        branded: {
          alert: "#cc4b37",
          black: "#0a0a0a",
          gray: "#cacaca",
          primary: "#c9c9c9",
          secondary: "#767676",
          success: "#3adb76",
          warning: "#ffae00",
          white: "#fefefe",
          red: "#ff0000",
        },
      },
      zIndex: {
        0: "0",
        1: "1",
        2: "2",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        61: "61",
      },
    },
  },

  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
