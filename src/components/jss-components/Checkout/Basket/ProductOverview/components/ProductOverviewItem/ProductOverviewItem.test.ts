import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import ProductOverviewItem from './ProductOverviewItem.vue'

beforeEach(() => {
  vi.resetModules()
})

vi.mock('lodash/debounce', () => ({
  default: vi.fn().mockImplementation((fn) => fn)
}))

describe('ProductOverviewItem', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)
  const findDomEls = (testId = '') => wrapper.findAll(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {} } = {}) => {
    wrapper = shallowMount(ProductOverviewItem, {
      propsData: props,
      global: {
        mocks: {
          $t: (msg: any) => msg
        },
        stubs: {
          I18nN: true
        }
      }
    })
  }

  test.each([
    {
      productAdditionalFeeLabel: 'Fee label',
      productAdditionalFee: 10,
      expectedResult: true
    },
    {
      productAdditionalFeeLabel: 'Fee label',
      productAdditionalFee: null,
      expectedResult: false
    },
    {
      productAdditionalFeeLabel: '',
      productAdditionalFee: 10,
      expectedResult: false
    },
    {
      productAdditionalFeeLabel: '',
      productAdditionalFee: null,
      expectedResult: false
    }
  ])(
    'contribution fee block should be shown or hidden based on fee label and fee value',
    ({ productAdditionalFeeLabel, productAdditionalFee, expectedResult }) => {
      const props = {
        productAdditionalFeeLabel,
        productAdditionalFee
      }

      createComponent({ props })

      const contributionBlock = findDomEl('contribution-fee-wrapper-id')
      const contributionSumBlock = findDomEl('contribution-fee-sum-id')

      const blocks = [contributionBlock, contributionSumBlock]

      blocks.forEach((block) => expect(block.exists()).toStrictEqual(expectedResult))
    }
  )

  test.each([
    {
      productPicassoMessages: [
        { Id: 'picasso ID', IsActive: true, Description: 'Picasso description' }
      ],
      expectedResult: true
    },
    {
      productPicassoMessages: [],
      expectedResult: false
    }
  ])(
    'picasso messages block should be shown or hidden based on length of data',
    ({ productPicassoMessages, expectedResult }) => {
      const props = {
        productPicassoMessages
      }

      createComponent({ props })

      const picassoMessagesBlock = findDomEl('picasso-messages-wrapper-id')

      expect(picassoMessagesBlock.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      productPicassoMessages: [
        { Id: 'picasso ID', IsActive: true, Description: 'Picasso description' }
      ],
      expectedResult: true
    },
    {
      productPicassoMessages: [
        { Id: 'picasso ID', IsActive: false, Description: 'Picasso description' }
      ],
      expectedResult: false
    }
  ])(
    'picasso message item should be shown or hidden based on IsActive value',
    ({ productPicassoMessages, expectedResult }) => {
      const props = {
        productPicassoMessages
      }

      createComponent({ props })

      const picassoMessageItem = findDomEl('picasso-message-item-id')

      expect(picassoMessageItem.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      productQuantity: 1,
      newProductQuantity: 2,
      productLineId: 'line-id'
    },
    {
      productQuantity: 2,
      newProductQuantity: 2,
      productLineId: 'line-id'
    },
    {
      productQuantity: 2,
      newProductQuantity: 1,
      productLineId: 'line-id'
    }
  ])(
    'addProduct emit should be triggered in case quantity of products has been increased',
    async ({ productQuantity, newProductQuantity, productLineId }) => {
      const props = {
        productQuantity,
        productLineId
      }

      createComponent({ props })

      const picassoMessageItem = findComponent('base-counter-id')

      picassoMessageItem.vm.$emit('update:modelValue', newProductQuantity)

      await nextTick()

      if (productQuantity >= newProductQuantity) {
        expect(wrapper.emitted('addProduct')).toBeUndefined

        return
      }

      expect(wrapper.emitted().addProduct.length).toStrictEqual(1)
      expect(wrapper.emitted('addProduct')[0]).toEqual([
        { productLineId: productLineId, quantity: newProductQuantity }
      ])
    }
  )

  test.each([
    {
      productQuantity: 2,
      newProductQuantity: 1,
      productLineId: 'line-id'
    },
    {
      productQuantity: 2,
      newProductQuantity: 2,
      productLineId: 'line-id'
    },
    {
      productQuantity: 2,
      newProductQuantity: 3,
      productLineId: 'line-id'
    }
  ])(
    'removeProduct emit should be triggered in case quantity of products has been decreased',
    async ({ productQuantity, newProductQuantity, productLineId }) => {
      const props = {
        productQuantity,
        productLineId
      }

      createComponent({ props })

      const picassoMessageItem = findComponent('base-counter-id')

      picassoMessageItem.vm.$emit('update:modelValue', newProductQuantity)

      await nextTick()

      if (newProductQuantity >= productQuantity) {
        expect(wrapper.emitted('removeProduct')).toBeUndefined

        return
      }

      expect(wrapper.emitted().removeProduct.length).toStrictEqual(1)
      expect(wrapper.emitted('removeProduct')[0]).toEqual([
        { productLineId: productLineId, quantity: newProductQuantity }
      ])
    }
  )

  test('removeProduct and addProduct emits should not be triggered in case quantity of products has not been changed', async () => {
    const props = {
      productQuantity: 2,
      newProductQuantity: 2,
      productLineId: 'line-id'
    }

    createComponent({ props })

    const picassoMessageItem = findComponent('base-counter-id')

    picassoMessageItem.vm.$emit('update:modelValue', props.newProductQuantity)

    await nextTick()

    expect(wrapper.emitted('removeProduct')).toBeUndefined
  })

  test('removeAllProducts emit should be triggered in case remove icon is clicked', async () => {
    const props = {
      productLineId: 'line-id'
    }

    createComponent({ props })

    const deleteIcon = findComponent('remove-all-icon-id')

    deleteIcon.trigger('click')

    await nextTick()

    expect(wrapper.emitted().removeAllProducts.length).toStrictEqual(1)
    expect(wrapper.emitted('removeAllProducts')[0]).toEqual([
      { productLineId: props.productLineId, quantity: 0 }
    ])
  })

  test.each([
    {
      subtotalProductPriceWithoutDiscount: 100,
      expectedResult: true
    },
    {
      subtotalProductPriceWithoutDiscount: null,
      expectedResult: false
    }
  ])(
    'product price without discount should be shown or hidden based on provided external value',
    async ({ subtotalProductPriceWithoutDiscount, expectedResult }) => {
      const props = {
        productSubtotal: {
          subtotalProductPrice: 200,
          subtotalProductPriceWithoutDiscount
        }
      }

      createComponent({ props })

      const productPriceComponent = findComponent('product-price-without-discount')

      expect(productPriceComponent.exists()).toBe(expectedResult)
    }
  )

  test.each([
    {
      showColumnTitles: true
    },
    {
      showColumnTitles: false
    }
  ])(
    'column titles should be shown or hidden based on external provided flag',
    ({ showColumnTitles }) => {
      const props = {
        showColumnTitles
      }

      createComponent({ props })

      const columnTitleBlocks = findDomEls('column-title-id')

      columnTitleBlocks.forEach((title) => {
        expect(title.exists()).toStrictEqual(showColumnTitles)
      })
    }
  )
})
