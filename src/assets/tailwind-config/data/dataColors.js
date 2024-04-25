export const colorData = {
  white: '#ffffff',
  black: '#28231f',

  'background-grey': '#f3f0eb',
  'residential-grey': '#ebe6de',
  'light-grey': '#c6bfb7',
  grey: '#78716b',
  'commercial-grey': '#454142',

  'light-red': '#e3a6b0',
  'logo-red': '#EE0000',
  red: '#c70000',
  'professional-red': '#a11515',

  'light-blue': '#a8c9e4',
  'splash-blue': '#5e8ed6',
  blue: '#476995',

  'light-yellow': '#f8e0a0',
  yellow: '#f2c242',

  'splash-green': '#17b56b'
}

function groupColors(colorDataObject) {
  const MAIN_COLORS = ['white', 'black', 'red', 'green', 'blue', 'yellow', 'grey']
  const colorGroups = {}

  MAIN_COLORS.forEach((mainColor) => {
    colorGroups[mainColor] = Object.keys(colorDataObject)
      .filter((colorKey) => colorKey.includes(mainColor))
      .reduce(
        (acc, currentColorKey) => ({
          ...acc,
          [currentColorKey]: colorDataObject[currentColorKey]
        }),
        {}
      )
  })

  return colorGroups
}

export const colorGroups = groupColors(colorData)
