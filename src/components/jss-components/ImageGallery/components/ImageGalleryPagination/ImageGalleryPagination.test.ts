import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

import ImageGalleryPagination from './ImageGalleryPagination.vue'

const useBreakpointsMockFn = vi.hoisted(() => vi.fn())

vi.mock('@/utils/composables/viewport/useBreakpoints', () => {
  return {
    default: useBreakpointsMockFn.mockImplementation(() => {
      return {
        isMobile: false
      }
    })
  }
})

beforeEach(() => {
  vi.resetModules()
})

describe('ImageGalleryPagination', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(ImageGalleryPagination, {
      propsData: props
    })
  }

  test('swiper component generates setThumbsSwiper emit event when swiper method is triggered', async () => {
    const testEmittedObject = {
      swiper: {}
    }

    createComponent({})

    const swiperComponent = findComponent('swiper-component-test-id')

    swiperComponent.vm.$emit('swiper', testEmittedObject)

    await nextTick()

    expect(wrapper.emitted().setThumbsSwiper.length).toStrictEqual(1)
    expect(wrapper.emitted('setThumbsSwiper')[0]).toEqual([testEmittedObject])
  })

  test.each([
    {
      items: [{ Image: { src: 'Some image' } }],
      expectedResult: { src: 'Some image' }
    },
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' } }],
      expectedResult: { value: 'Some thumbnail image' }
    }
  ])(
    'sc-image component should show Image or Thumbnail image based on avaliable data',
    ({ items, expectedResult }) => {
      const props = {
        items
      }

      createComponent(props)

      const imageComponen = findComponent('swiper-slide-item')

      expect(imageComponen.props().media).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      isMobile: { value: true },
      items: [{ Image: { src: 'Some image' } }],
      direction: 'vertical',
      expectedResult: 'horizontal'
    },
    {
      isMobile: { value: false },
      items: [{ Image: { src: 'Some image' } }],
      direction: 'vertical',
      expectedResult: 'vertical'
    }
  ])(
    'image gallery pagination get valid direction basded on device size',
    ({ isMobile, direction, items, expectedResult }) => {
      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile
        }
      })

      const props = {
        items,
        direction,
        modules: []
      }

      createComponent(props)

      const swiperComponent = findComponent('swiper-component-test-id')

      expect(swiperComponent.props().direction).toStrictEqual(expectedResult)
    }
  )
})
