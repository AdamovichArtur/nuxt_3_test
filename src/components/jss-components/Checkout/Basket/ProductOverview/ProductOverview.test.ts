import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'

import { stubComponent } from '@/../scripts/test/setup'

import { useBasketStore } from '@/stores/BasketStore/BasketStore'

import ProductOverview from './ProductOverview.vue'
import BaseBottomBar from '@/components/self-components/BaseBottomBar/BaseBottomBar.vue'
import BaseModal from '@/components/self-components/BaseModal/BaseModal.vue'

const useBreakpointsMockFn = vi.hoisted(() => vi.fn())
const dataFetcher = vi.hoisted(() => vi.fn())
const basketId = 'basket-id-value'

vi.mock('@/utils/composables/viewport/useBreakpoints', () => {
  return {
    default: useBreakpointsMockFn.mockImplementation(() => {
      return {
        isMobile: false
      }
    })
  }
})

vi.mock('@/dataFetcher', () => ({
  dataFetcher: dataFetcher.mockImplementation(() => {
    return {}
  })
}))

vi.mock('@/utils/composables/cookieManager', () => ({
  getBasketCookie: () => ({
    basketId
  })
}))

const BaseBottomBarStub = stubComponent(BaseBottomBar)
const BaseModalStub = stubComponent(BaseModal)

beforeEach(() => {
  vi.resetModules()
})

describe('ProductOverviewInfo', () => {
  let wrapper
  let basketStore

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findAllComponents = (testId = '') => wrapper.findAllComponents(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {}, initialStoreState = {}, stubActions = true } = {}) => {
    wrapper = shallowMount(ProductOverview, {
      propsData: { rendering: {}, ...props, ...initialStoreState },
      global: {
        mocks: {
          $t: (msg: any) => msg
        },
        plugins: [
          createTestingPinia({
            stubActions: stubActions
          })
        ],
        stubs: {
          I18nN: true,
          BaseBottomBar: BaseBottomBarStub,
          BaseModal: BaseModalStub
        }
      }
    })

    basketStore = useBasketStore()
  }

  test.each([
    {
      productItems: [{ LineId: 'Some Line id', Value: 'Some Value' }],
      emitEvent: 'addProduct',
      emitProductLineId: 'product line id',
      emitQuantity: 1
    },
    {
      productItems: [{ LineId: 'Some Line id', Value: 'Some Value' }],
      emitEvent: 'removeProduct',
      emitProductLineId: 'product line id',
      emitQuantity: 1
    }
  ])(
    'product overview item component generates addProduct and removeProduct events and calls valid api function',
    async ({ productItems, emitEvent, emitProductLineId, emitQuantity }) => {
      createComponent()

      basketStore.$patch({
        basket: {
          items: productItems
        }
      })
      await nextTick()
      const productOverviewItemComponent = findComponent('product-overview-item-id')
      productOverviewItemComponent.vm.$emit(emitEvent, {
        productLineId: emitProductLineId,
        quantity: emitQuantity
      })

      await nextTick()

      expect(dataFetcher).toHaveBeenCalledWith(
        `/api/checkout/updateProductQuantity?sc_site=&basketId=${basketId}`,
        {
          BasketLineId: emitProductLineId,
          Quantity: emitQuantity
        }
      )
    }
  )

  test.each([
    {
      productItems: [{ LineId: 'Some Line id', Value: 'Some Value' }],
      emitEvent: 'removeAllProducts',
      emitProductLineId: 'product line id',
      hasUserConfirmedRemovalProcess: true,
      emitQuantity: 0
    },
    {
      productItems: [{ LineId: 'Some Line id', Value: 'Some Value' }],
      emitEvent: 'removeAllProducts',
      emitProductLineId: 'product line id',
      hasUserConfirmedRemovalProcess: false,
      emitQuantity: 0
    }
  ])(
    'Base bottom modal buttons generates api calls based on user button click',
    async ({
      productItems,
      emitEvent,
      emitProductLineId,
      emitQuantity,
      hasUserConfirmedRemovalProcess
    }) => {
      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile: {
            value: true
          }
        }
      })

      createComponent()
      basketStore.$patch({
        basket: {
          items: productItems
        }
      })
      await nextTick()

      const productOverviewItemComponent = findComponent('product-overview-item-id')

      productOverviewItemComponent.vm.$emit(emitEvent, {
        productLineId: emitProductLineId,
        quantity: emitQuantity
      })

      await nextTick()

      if (hasUserConfirmedRemovalProcess) {
        const removeAllProductsButtonComponent = findComponent(
          'remove-all-products-base-bottom-bar-button-id'
        )

        removeAllProductsButtonComponent.trigger('click')

        await nextTick()

        expect(dataFetcher).toHaveBeenCalledWith(
          `/api/checkout/updateProductQuantity?sc_site=&basketId=${basketId}`,
          {
            BasketLineId: emitProductLineId,
            Quantity: emitQuantity
          }
        )
      } else {
        const closeModalButton = findComponent('close-base-bottom-bar-button-id')

        closeModalButton.trigger('click')

        await nextTick()

        expect(dataFetcher).not.toHaveBeenCalled()
      }
    }
  )

  test.each([
    {
      isMobile: true,
      expectedResult: true
    },
    {
      isMobile: false,
      expectedResult: false
    }
  ])(
    'Base bottom bar should be shown when device screen is mobile',
    ({ isMobile, expectedResult }) => {
      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile
        }
      })

      createComponent()

      const BottomBarComponent = findComponent('base-bottom-bar-id')

      expect(BottomBarComponent.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      productItems: [
        {
          SumPrice: {
            PriceWithVat: 123,
            PriceExVat: 321,
            HasDiscount: false,
            DiscountedPriceWithVat: 100
          }
        }
      ],
      showPricesWithVat: true,
      expectedPrice: {
        subtotalProductPrice: 123,
        subtotalProductPriceWithoutDiscount: null
      }
    },
    {
      productItems: [
        {
          SumPrice: {
            PriceWithVat: 123,
            PriceExVat: 321,
            HasDiscount: false,
            DiscountedPriceWithVat: 100
          }
        }
      ],
      showPricesWithVat: false,
      expectedPrice: {
        subtotalProductPrice: 321,
        subtotalProductPriceWithoutDiscount: null
      }
    },
    {
      productItems: [
        {
          SumPrice: {
            PriceWithVat: 123,
            PriceExVat: 321,
            HasDiscount: true,
            DiscountedPriceExVat: 50,
            DiscountedPriceWithVat: 100
          }
        }
      ],
      showPricesWithVat: true,
      expectedPrice: {
        subtotalProductPrice: 100,
        subtotalProductPriceWithoutDiscount: 123
      }
    },
    {
      productItems: [
        {
          SumPrice: {
            PriceWithVat: 123,
            PriceExVat: 321,
            HasDiscount: true,
            DiscountedPriceExVat: 50,
            DiscountedPriceWithVat: 100
          }
        }
      ],
      showPricesWithVat: false,
      expectedPrice: {
        subtotalProductPrice: 50,
        subtotalProductPriceWithoutDiscount: 321
      }
    }
  ])(
    'Component should provide proudt price with or without VAT based on external boolean value',
    async ({ productItems, showPricesWithVat, expectedPrice }) => {
      createComponent({ stubActions: false })

      basketStore.$patch({
        basket: {
          items: productItems
        },
        showPricesWithVat: showPricesWithVat
      })

      await nextTick()
      const productOverviewItemComponent = findComponent('product-overview-item-id')

      expect(productOverviewItemComponent.props().productSubtotal).toStrictEqual(expectedPrice)
    }
  )

  test.each([
    {
      productItems: [{ LineId: 'Some Line id', Value: 'Some Value' }],
      expectedResult: true
    },
    {
      productItems: [
        { LineId: 'Some Line id', Value: 'Some Value' },
        { LineId: 'Some Line id 2', Value: 'Some Value 2' }
      ],
      expectedResult: false
    }
  ])(
    'product overview item should get valid title visibility flag based on iterable element ',
    async ({ productItems, expectedResult }) => {
      createComponent()
      basketStore.$patch({
        basket: {
          items: productItems
        }
      })

      await nextTick()

      if (productItems.length > 1) {
        const productOverviewItemComponents = findAllComponents('product-overview-item-id')

        expect(productOverviewItemComponents[1].props().showColumnTitles).toBe(expectedResult)
      } else {
        const productOverviewItemComponent = findComponent('product-overview-item-id')

        expect(productOverviewItemComponent.props().showColumnTitles).toBe(expectedResult)
      }
    }
  )
})
