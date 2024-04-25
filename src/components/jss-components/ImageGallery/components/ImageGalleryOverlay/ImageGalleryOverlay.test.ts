import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import ImageGalleryOverlay from './ImageGalleryOverlay.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ImageGalleryOverlay', () => {
  let wrapper

  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(ImageGalleryOverlay, {
      propsData: props
    })
  }

  test.each([
    {
      showFullMode: true,
      expectedResult: true
    },
    {
      showFullMode: false,
      expectedResult: false
    }
  ])(
    'overlay wrapper should be hidden or shown based onf showFullMode boolean external property',
    ({ showFullMode, expectedResult }) => {
      const props = {
        showFullMode
      }

      createComponent(props)

      const overlayWrapper = findDomEl('overlay-wrapper-test-id')

      expect(overlayWrapper.exists()).toStrictEqual(expectedResult)
    }
  )

  test('overlay wrapper should generate clickOutside event when user clicks on overlay', () => {
    const props = {
      showFullMode: true
    }

    createComponent(props)

    const overlaySpan = findDomEl('overlay-span-test-id')

    overlaySpan.trigger('click')

    expect(wrapper.emitted().clickOutside.length).toStrictEqual(1)
  })
})
