import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import ProductOverviewInfo from './ProductOverviewInfo.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ProductOverviewInfo', () => {
  let wrapper

  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {} } = {}) => {
    wrapper = shallowMount(ProductOverviewInfo, {
      propsData: props
    })
  }

  test.each([
    {
      productAttributes: [{ Label: 'Some label', Value: 'Some Value' }],
      expectedResult: true
    },
    {
      productAttributes: [{ Label: '', Value: 'Some Value' }],
      expectedResult: false
    },
    {
      productAttributes: [{ Label: '', Value: '' }],
      expectedResult: false
    },
    {
      productAttributes: [{ Label: 'Some label', Value: '' }],
      expectedResult: false
    }
  ])(
    'contribution fee block should be shown or hidden based on fee label and fee value',
    ({ productAttributes, expectedResult }) => {
      const props = {
        productAttributes
      }

      createComponent({ props })

      const attributeItemWrapperEl = findDomEl('attribute-item-wrapper-id')

      expect(attributeItemWrapperEl.exists()).toStrictEqual(expectedResult)
    }
  )
})
