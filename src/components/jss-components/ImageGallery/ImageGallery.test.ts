import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

import ImageGallery from './ImageGallery.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ImageGallery', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(ImageGallery, {
      propsData: props
    })
  }

  test.each([
    {
      mouseenter: true,
      expectedResult: true
    },
    {
      mouseenter: false,
      expectedResult: false
    }
  ])(
    'image-gallery-content component should get actual hover carousel boolean value',
    async ({ mouseenter, expectedResult }) => {
      const props = {
        items: []
      }

      createComponent(props)

      const imageGalleryComponent = findComponent('image-gallery-content-test-id')
      const imageGalleryWrapper = findDomEl('image-gallery-wrapper')

      if (mouseenter) {
        imageGalleryWrapper.trigger('mouseenter')
      } else {
        imageGalleryWrapper.trigger('mouseleave')
      }

      await nextTick()

      expect(imageGalleryComponent.props().isCarouselHovered).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      items: [],
      expectedResult: false
    },
    {
      items: [{ value: 1 }, { value: 2 }],
      expectedResult: true
    }
  ])(
    'image-gallery-pagination shoud be hidden or shown based on lenth of items property',
    async ({ items, expectedResult }) => {
      const props = {
        fields: {
          items
        }
      }

      createComponent(props)

      const imageGalleryPaginationComponent = findComponent('image-gallery-pagination-test-id')

      expect(imageGalleryPaginationComponent.exists()).toBe(expectedResult)
    }
  )

  test.each([
    {
      HorizontalThumbnails: { value: true },
      expectedResult: false
    },
    {
      HorizontalThumbnails: { value: false },
      expectedResult: true
    }
  ])(
    'related components and wrappers contain or does not contain vartical necessary classes',
    async ({ HorizontalThumbnails, expectedResult }) => {
      const props = {
        fields: {
          HorizontalThumbnails,
          items: [{ value: 1 }, { value: 2 }]
        }
      }
      const expectedInnerClass = 'test-vertical-class'

      createComponent(props)

      const imageGalleryWrapper = findDomEl('image-gallery-wrapper')
      const imageGalleryContent = findComponent('image-gallery-content-test-id')
      const imageGalleryPaginationComponent = findComponent('image-gallery-pagination-test-id')

      const comp = [imageGalleryWrapper, imageGalleryContent, imageGalleryPaginationComponent]

      comp.forEach((item) => {
        if (expectedResult) {
          expect(item.classes()).toContain(expectedInnerClass)
        } else {
          expect(item.classes()).not.toContain(expectedInnerClass)
        }
      })
    }
  )

  test.each([
    {
      SliderDuration: { value: 4 },
      Autoslide: { value: true },
      expectedResult: {
        delay: 4000,
        pauseOnMouseEnter: true
      }
    },
    {
      SliderDuration: { value: 4 },
      Autoslide: { value: false },
      expectedResult: undefined
    }
  ])(
    'autoplay options contain valid settings based on sitrecore data',
    async ({ SliderDuration, Autoslide, expectedResult }) => {
      const props = {
        fields: {
          SliderDuration,
          Autoslide
        }
      }

      createComponent(props)

      const imageGalleryContent = findComponent('image-gallery-content-test-id')

      expect(imageGalleryContent.props().autoplayOptions).toStrictEqual(expectedResult)
    }
  )
})
