import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import BaseButton from './BaseButton.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('BaseButton', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = mount(BaseButton, {
      propsData: props
    })
  }

  test.each([
    {
      props: {
        linkUrl: 'https://example.com'
      },
      doesContentRender: true
    },
    {
      props: {
        linkUrl: null
      },
      doesContentRender: true
    }
  ])('baseButton renders correctly', ({ props, doesContentRender }) => {
    createComponent(props)

    const baseButton = findComponent('base-button-id')

    expect(baseButton.exists()).toStrictEqual(doesContentRender)
  })

  test.each([
    {
      props: {
        linkUrl: 'https://example.com'
      },
      htmlTag: 'a'
    },
    {
      props: {
        linkUrl: null
      },
      htmlTag: 'button'
    }
  ])('renders the correct html tag', ({ props, htmlTag }) => {
    createComponent(props)

    const baseButton = findComponent('base-button-id')

    expect(baseButton.find(htmlTag).exists()).toBeTruthy()
  })

  test.each([
    {
      props: {
        label: 'Click me'
      },
      label: 'Click me'
    },
    {
      props: {
        label: 'Button A'
      },
      label: 'Button A'
    }
  ])('displays the correct label', ({ props, label }) => {
    createComponent(props)

    const baseButton = findComponent('base-button-id')

    expect(baseButton.text()).toContain(label)
  })

  test.each([
    {
      props: {
        styleImportance: 'primary'
      },
      styleClasses: ['text-velux-white', 'bg-velux-red', 'hover:bg-velux-black']
    },
    {
      props: {
        styleImportance: 'secondary'
      },
      styleClasses: ['text-velux-white', 'bg-velux-blue', 'hover:bg-velux-red']
    },
    {
      props: {
        styleImportance: 'tertiary'
      },
      styleClasses: ['text-velux-black', 'bg-velux-light-grey', 'hover:bg-velux-light-grey']
    },
    {
      props: {
        size: 'small',
        isPadding: false
      },
      styleClasses: ['text-xs']
    },
    {
      props: {
        size: 'small',
        isPadding: true
      },
      styleClasses: ['text-xs', 'py-1.5', 'px-3']
    },
    {
      props: {
        size: 'large',
        isPadding: false
      },
      styleClasses: ['text-lg']
    },
    {
      props: {
        size: 'large',
        isPadding: true
      },
      styleClasses: ['text-lg', 'py-2.5', 'px-5']
    },
    {
      props: {
        size: 'medium',
        isPadding: true
      },
      styleClasses: ['py-2', 'px-4']
    },
    {
      props: {
        isBottomIndent: true
      },
      styleClasses: ['mb-6']
    },
    {
      props: {
        disabled: true
      },
      styleClasses: ['opacity-30', 'cursor-not-allowed']
    },
    {
      props: {
        disabled: false
      },
      styleClasses: ['cursor-pointer']
    }
  ])('applies the correct styles based on props', ({ props, styleClasses }) => {
    createComponent(props)

    const baseButton = findComponent('base-button-id')
    const baseButtonClasses = baseButton.classes()

    styleClasses.forEach((c) => {
      expect(baseButtonClasses).toContain(c)
    })
  })
})
