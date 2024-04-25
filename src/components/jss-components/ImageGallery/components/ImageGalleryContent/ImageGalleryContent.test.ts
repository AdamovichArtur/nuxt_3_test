import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { stubComponent } from '@/../scripts/test/setup'

import ImageGalleryContent from './ImageGalleryContent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

const generateCustomSlideTemplate = (isActive = true) =>
  `<div><slot v-bind="{ isActive: ${isActive} }"></slot></div>`

let SwiperSlideStub = stubComponent(SwiperSlide, {
  template: generateCustomSlideTemplate()
})

const SwiperStub = stubComponent(Swiper, {
  /* to prevent '[Vue warn]: Component emitted event "slide-change" 
    but it is neither declared in the emits option
    nor as an "onSlide-change" prop."' */
  emits: ['slide-change', 'swiper', 'reach-end']
})

beforeEach(() => {
  vi.resetModules()
})

describe('ImageGalleryContent', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(ImageGalleryContent, {
      propsData: props,
      global: {
        stubs: {
          Swiper: SwiperStub,
          SwiperSlide: SwiperSlideStub
        }
      }
    })
  }

  test('image gallery content component generates event setMainSwiper when swiper component triggers swiper event', async () => {
    const props = {
      items: []
    }
    const testEmittedObject = {
      swiper: {}
    }

    createComponent(props)

    const imageGalleryContentComponent = findComponent('swiper-component-test-id')

    imageGalleryContentComponent.vm.$emit('swiper', testEmittedObject)

    await nextTick()

    expect(wrapper.emitted().setMainSwiper.length).toStrictEqual(1)
    expect(wrapper.emitted('setMainSwiper')[0]).toEqual([testEmittedObject])
  })

  test.each([
    {
      items: [{ Image: { src: 'Some image' } }],
      expectedResult: false
    },
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' } }],
      expectedResult: true
    }
  ])(
    'swiper-slide component adds or hide classes based on VideoThumbnail value',
    ({ items, expectedResult }) => {
      const props = {
        items
      }

      createComponent(props)

      const imageComponent = findComponent('swiper-slide-component-test-id')

      if (expectedResult) {
        expect(imageComponent.classes()).toContain('thumbnail-test-class')
      } else {
        expect(imageComponent.classes()).not.toContain('thumbnail-test-class')
      }
    }
  )

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

      const imageComponen = findComponent('image-component-test-id')

      expect(imageComponen.props().media).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' } }],
      expectedResult: false
    },
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' } }],
      expectedResult: true
    }
  ])(
    'image component adds or hide classes based on isActiveVideo value',
    async ({ items, expectedResult }) => {
      const props = {
        items
      }

      createComponent(props)

      if (expectedResult) {
        const buttonPlayVideo = findDomEl('button-play-video-test-id')

        buttonPlayVideo.trigger('click')

        await nextTick()

        const imageComponent = findComponent('image-component-test-id')

        expect(imageComponent.classes()).toContain('image-inactive-test-class')
      } else {
        const imageComponent = findComponent('image-component-test-id')

        expect(imageComponent.classes()).not.toContain('image-inactive-test-class')
      }
    }
  )

  test.each([
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' }, Video: { src: '' } }],
      expectedResult: false
    },
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' } }],
      expectedResult: true
    }
  ])(
    'image component adds or hide image-test-class class based on Video value from Sitecore',
    async ({ items, expectedResult }) => {
      const props = {
        items
      }

      createComponent(props)

      const imageComponent = findComponent('image-component-test-id')

      if (expectedResult) {
        expect(imageComponent.classes()).toContain('image-test-class')
      } else {
        expect(imageComponent.classes()).not.toContain('image-test-class')
      }
    }
  )

  test.each([
    {
      items: [{ Image: { src: 'Some image' } }],
      expectedResult: false
    },
    {
      items: [{ VideoThumbnail: { value: 'Some thumbnail image' } }],
      expectedResult: true
    }
  ])(
    'button component should be shown or hidden based on VideoThumbnail external value',
    ({ items, expectedResult }) => {
      const props = {
        items
      }

      createComponent(props)

      const buttonPlayVideo = findDomEl('button-play-video-test-id')

      expect(buttonPlayVideo.exists()).toBe(expectedResult)
    }
  )

  test('image gallery content component generates showOrHideFullScreen emit event when user clicks on the image', async () => {
    const props = {
      items: [{ Image: { src: 'Some image' } }]
    }

    createComponent(props)

    const imageComponent = findComponent('image-component-test-id')

    imageComponent.trigger('click')

    await nextTick()

    expect(wrapper.emitted().showOrHideFullScreen.length).toStrictEqual(1)
    expect(wrapper.emitted('showOrHideFullScreen')[0]).toEqual([0]) // first index from items array
  })

  test.each([
    {
      items: [
        {
          Video: { value: 'Some video value' },
          VideoThumbnail: { value: 'Some thumbnail image' }
        }
      ],
      expectedResult: false
    },
    {
      items: [
        {
          Video: { value: 'Some video value' },
          VideoThumbnail: { value: 'Some thumbnail image' }
        }
      ],
      expectedResult: true
    },
    {
      items: [
        {
          Image: { value: { src: 'Some image value' } }
        }
      ],
      expectedResult: false
    }
  ])(
    'video container should be shown or hidden based on provided external data',
    async ({ items, expectedResult }) => {
      const props = {
        items
      }

      createComponent(props)

      if (expectedResult) {
        const buttonPlayVideo = findDomEl('button-play-video-test-id')

        buttonPlayVideo.trigger('click')

        await nextTick()

        const videoContainer = findDomEl('video-wrapper-test-id')

        expect(videoContainer.exists()).toBeTruthy()
      } else {
        const videoContainer = findDomEl('video-wrapper-test-id')

        expect(videoContainer.exists()).not.toBeTruthy()
      }
    }
  )

  test.each([
    {
      items: [
        {
          Video: { value: 'Some video value' },
          VideoThumbnail: { value: 'Some thumbnail image' }
        }
      ],
      isActive: true,
      expectedResult: true
    },
    {
      items: [
        {
          Video: { value: 'Some video value' },
          VideoThumbnail: { value: 'Some thumbnail image' }
        }
      ],
      isActive: false,
      expectedResult: false
    }
  ])(
    'video container should be shown or hidden in case swiper-slide is active or inactive',
    async ({ items, isActive, expectedResult }) => {
      const props = {
        items
      }

      SwiperSlideStub = stubComponent(SwiperSlide, {
        template: generateCustomSlideTemplate(isActive)
      })

      createComponent(props)

      const buttonPlayVideo = findDomEl('button-play-video-test-id')

      buttonPlayVideo.trigger('click')

      await nextTick()

      const videoContainer = findDomEl('video-wrapper-test-id')

      expect(videoContainer.exists()).toBe(expectedResult)
    }
  )
})
