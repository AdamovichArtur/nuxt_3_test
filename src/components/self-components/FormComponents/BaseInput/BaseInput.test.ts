import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import BaseInput from './BaseInput.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('BaseInput', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(BaseInput, {
      propsData: props
    })
  }

  test.each([
    {
      props: {},
      doesContentRender: true
    },
    {
      props: {
        label: 'First name',
        usePlaceholder: true
      },
      doesContentRender: true
    },
    {
      props: {
        pattern: '[0-9]{4}',
        validationMarkerType: 'round'
      },
      doesContentRender: true
    }
  ])('inputComponent renders correctly', ({ props, doesContentRender }) => {
    createComponent(props)

    const baseInput = findComponent('base-input-id')

    expect(baseInput.exists()).toStrictEqual(doesContentRender)
  })

  test.each([
    {
      props: {
        pattern: '[0-9]{4}'
      },
      mockedInput: '1123',
      isMockedFieldValid: true
    },
    {
      props: {
        pattern: '[0-9]{4}'
      },
      mockedInput: '11234',
      isMockedFieldValid: false
    },
    {
      props: {
        pattern: '[0-9]{4}'
      },
      mockedInput: 'Jane',
      isMockedFieldValid: false
    },
    {
      props: {
        pattern: '[a-z]{0,10}'
      },
      mockedInput: 'jane',
      isMockedFieldValid: true
    },
    {
      props: {
        pattern: '[a-z]{0,10}'
      },
      mockedInput: 'Jane',
      isMockedFieldValid: false
    },
    {
      props: {
        pattern: '[a-z]{0,10}'
      },
      mockedInput: 'jane doe',
      isMockedFieldValid: false
    },
    {
      props: {
        pattern: '[a-z]{0,10}'
      },
      mockedInput: 'janedosey',
      isMockedFieldValid: true
    }
  ])('input gets validated correctly', async ({ props, mockedInput, isMockedFieldValid }) => {
    createComponent(props)

    const baseInput = findComponent('base-input-id')

    await baseInput.find('input').setValue(mockedInput)
    expect(baseInput.find('input').element.value).toBe(mockedInput)

    // Trigger the onClickOutside event
    window.dispatchEvent(new Event('click'))

    await nextTick()

    expect(baseInput.vm.isFieldValid).toBe(isMockedFieldValid)
  })

  test.each([
    {
      props: {
        label: 'First name',
        usePlaceholder: true
      },
      hasLabel: false,
      mockedLabel: 'First name'
    },
    {
      props: {
        label: 'First name',
        usePlaceholder: false
      },
      hasLabel: true,
      mockedLabel: ''
    },
    {
      props: {
        label: ''
      },
      hasLabel: false
    }
  ])(
    'renders input component with label and placeholder',
    async ({ props, hasLabel, mockedLabel }) => {
      createComponent(props)

      const labelElement = findDomEl('label-id')

      expect(labelElement.exists()).toStrictEqual(hasLabel)

      if (labelElement.exists()) {
        const baseInput = findComponent('base-input-id')

        expect(baseInput.find('input').attributes('placeholder')).toBe(mockedLabel)
      }
    }
  )

  test.each([
    {
      props: {
        pattern: '[0-9]{4}',
        validationMarkerType: 'round'
      },
      mockedInput: '1234',
      expectedClasses: ['text-velux-white', 'bg-velux-splash-green', 'rounded-full'],
      hasMarker: true
    },
    {
      props: {
        pattern: '[0-9]{4}',
        validationMarkerType: 'round'
      },
      mockedInput: '12345',
      expectedClasses: ['text-velux-white', 'bg-velux-red', 'rounded-full'],
      hasMarker: true
    },
    {
      props: {
        pattern: '[0-9]{4}',
        validationMarkerType: 'none'
      },
      mockedInput: '1234',
      hasMarker: false
    },
    {
      props: {
        pattern: '[0-9]{4}',
        validationMarkerType: 'icon'
      },
      mockedInput: '1234',
      expectedClasses: ['text-velux-splash-green', 'after:content-checkmark'],
      hasMarker: true
    },
    {
      props: {
        pattern: '[0-9]{4}',
        validationMarkerType: 'icon'
      },
      mockedInput: '1234fewwqe',
      expectedClasses: ['text-velux-red', 'after:content-x'],
      hasMarker: true
    },
    {
      props: {
        pattern: '[0-9]{4}'
      },
      mockedInput: '1234fewwqe',
      hasMarker: false
    }
  ])('validation marker', async ({ props, mockedInput, expectedClasses, hasMarker }) => {
    createComponent(props)

    const baseInput = findComponent('base-input-id')

    await baseInput.find('input').setValue(mockedInput)

    // Trigger the onClickOutside event
    window.dispatchEvent(new Event('click'))

    await nextTick()

    const marker = findDomEl('validation-marker-id')
    expect(marker.exists()).toBe(hasMarker)

    if (marker.exists()) {
      expectedClasses.forEach((c) => {
        expect(marker.classes(c)).toBeTruthy()
      })
    }
  })

  test.each([
    {
      props: {
        disabled: true
      },
      disabled: true
    },
    {
      props: {
        disabled: false
      },
      disabled: false
    },
    {
      props: {},
      disabled: false
    }
  ])('renders correct class based on disabled prop', ({ props, disabled }) => {
    createComponent(props)

    const baseInput = findComponent('base-input-id').find('input')

    expect(baseInput.classes('cursor-not-allowed')).toStrictEqual(disabled)
  })

  test.each([
    {
      props: {
        pattern: '[0-9]{4}',
        validLabel: 'Success',
        invalidLabel: 'Error'
      },
      mockedInput: '1234',
      expectedValidationLabel: 'Success',
      expectedValidationLabelClass: 'text-velux-splash-green',
      hasValidationLabel: true
    }
  ])(
    'renders correct validation label',
    async ({
      props,
      mockedInput,
      expectedValidationLabel,
      expectedValidationLabelClass,
      hasValidationLabel
    }) => {
      createComponent(props)

      const baseInput = findComponent('base-input-id')

      await baseInput.find('input').setValue(mockedInput)

      window.dispatchEvent(new Event('click'))

      await nextTick()

      expect(baseInput.vm.isFieldValid).toBe(hasValidationLabel)

      const validationLabel = findDomEl('validation-label-id')

      validationLabel.classes().forEach((c) => {
        expect(c).toBe(expectedValidationLabelClass)
      })
    }
  )
})
