/**
 * Generates classes that will toggle the visibility of a component or element inside a component
 * @param values array of strings containing screen sizes users would like to show the component
 * or element inside a component on. Example: [ "small", "large" ]
 * @returns array of strings representing class names used for hiding. Example: [ "hide-for-medium-only" ]
 */

export function hideElement(values: string[]) {
  const classes: string[] = []
  let screens: string[] = ['small', 'medium', 'large']

  if (values) {
    values.forEach((value) => {
      screens = screens.filter((screen) => screen !== value.toLowerCase())
    })

    if (screens.length !== 0) {
      for (let i = 0; i < screens.length; i++) {
        classes.push('hide-for-' + screens[i] + '-only')
      }
    }
  }

  return classes
}

class ScreenSize {
  size?: string
  isMobile?: boolean

  getSize() {
    const initialSize = this.size
    this.size = 'sm'
    if (window.matchMedia('only screen and (min-width: 640px) and (max-width: 1023px').matches)
      this.size = 'md'
    if (window.matchMedia('only screen and (min-width: 1024px)').matches) this.size = 'lg'

    this.isMobile = this.size == 'sm'

    if (this.size !== initialSize) {
      //Trigger breakpoint change event on the window
      const event = new CustomEvent('breakpointChanged', { detail: this.size })
      window.dispatchEvent(event)
    }
  }
  constructor() {
    if (typeof window !== 'undefined') {
      this.getSize()

      window.addEventListener('resize', () => {
        this.getSize()
      })
    }
  }
}

export const ScreenSizes = new ScreenSize()

function getMobileInnerHeight() {
  if (ScreenSizes.isMobile) {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`)
  }
}

export function windowLoad() {
  getMobileInnerHeight()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      getMobileInnerHeight()
    })
  }
}

export function convertRemToPixels(rem: Number | any) {
  const result: Number = rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  return result
}

export function convertPixelsToRem(px: Number | any) {
  const result: Number = px / parseFloat(getComputedStyle(document.documentElement).fontSize)
  return result
}
