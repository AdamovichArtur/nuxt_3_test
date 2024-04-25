import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import ImageComponent from './ImageComponent.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ImageComponent', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(ImageComponent, {
      propsData: props
    })
  }

  test.each([
    {
      href: 'test-link',
      doesLinkExist: true
    },
    {
      href: '',
      doesLinkExist: false
    }
  ])(
    'sc-link component should be shown or hidden based on href value',
    ({ href, doesLinkExist }) => {
      createComponent({
        fields: {
          Link: {
            value: {
              href: href
            }
          }
        }
      })

      const scLink = findComponent('sc-link-id')

      expect(scLink.exists()).toStrictEqual(doesLinkExist)
    }
  )

  test.each([
    {
      href: 'test-link',
      doesImageExist: false
    },
    {
      href: '',
      doesImageExist: true
    }
  ])(
    'sc-image component should be shown or hidden based on href value',
    ({ href, doesImageExist }) => {
      createComponent({
        fields: {
          Link: {
            value: {
              href: href
            }
          }
        }
      })

      const scImage = findComponent('sc-image-id')

      expect(scImage.exists()).toStrictEqual(doesImageExist)
    }
  )
})
