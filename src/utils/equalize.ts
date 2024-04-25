import { ScreenSizes } from './utils'

const Equalize = {
  mounted(el: HTMLElement, binding) {
    if (binding.value !== false) {
      equalizeHeight(el)
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', () => {
          equalizeHeight(el)
        })
      }
    }
  }
}

export default {
  install(App) {
    App.directive('equalize', Equalize)
  }
}

function equalizeHeight(element: HTMLElement) {
  //Get all elements with data-equalize-target
  const equalizeElements: HTMLElement[] = Array.from(
    element.querySelectorAll('[data-equalize-target]')
  )
  if (equalizeElements.length === 0) return
  if (ScreenSizes.isMobile) {
    equalizeElements.forEach((item) => (item.style.height = null))
    return
  }
  //Get the unique groups of data-equalize-target
  const uniqueGroups: string[] = [
    ...new Set([...equalizeElements].map((item) => item.dataset.equalizeTarget))
  ]
  //Loop through the unique groups and find the elements with that group
  uniqueGroups.forEach((group) => {
    //Get the elements with the current value
    const groupElements: HTMLElement[] = getElementsByGroup(equalizeElements, group)
    //Get the height of the tallest element
    const maxHeight: number = getMaxHeight(groupElements)
    //Set the height of all elements to the tallest element
    applyHeight(groupElements, maxHeight)
  })
}

function getElementsByGroup(elements: HTMLElement[], group: string): HTMLElement[] {
  return elements.filter((item) => item.dataset.equalizeTarget === group)
}

function getMaxHeight(elements: HTMLElement[]): number {
  return Math.max(
    ...elements.map((item) => {
      //Reset the height of all elements to auto
      item.style.height = null
      //Return the height of the element
      return item.offsetHeight
    })
  )
}

function applyHeight(elements: HTMLElement[], height: number) {
  elements.forEach((item) => (item.style.height = `${height}px`))
}
