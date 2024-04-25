import { useBasketStore } from '@/stores/BasketStore/BasketStore'
import { useGlobalStore } from '@/stores/GlobalStore'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount, flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import Upsell from './Upsell.vue'

const dataFetcher = vi.hoisted(() => vi.fn())
const getBasketCookie = vi.hoisted(() => vi.fn())

const dataFetcherMockData = {
  Title: 'KIX 300',
  ProductSetImage: {
    value: {
      src: '/-/media/ProductImages/ACCESSORY/KIX-300-EU2.jpg',
      alt: 'KIX 300 EU',
      width: 600,
      height: 600
    }
  },
  Id: 'KIX 300 EU2',
  ShowAddToBasket: true,
  Prices: {
    HasDiscount: false,
    Price: {
      PriceWithVat: 276.0,
      PriceExVat: 230.0,
      PriceVat: 46.0
    }
  }
}
vi.mock('@/dataFetcher', () => ({
  dataFetcher: dataFetcher.mockImplementation(() => {
    return [dataFetcherMockData]
  })
}))

vi.mock('@/utils/composables/cookieManager', () => ({
  getBasketCookie: getBasketCookie.mockImplementation(() => ({ basdketId: 1 }))
}))

beforeEach(() => {
  vi.resetModules()
})

describe('Upsell', () => {
  let wrapper
  let basketStore
  let globalStore

  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {}, initialStoreState = {} } = {}) => {
    wrapper = shallowMount(Upsell, {
      propsData: props,
      global: {
        plugins: [
          createTestingPinia({
            initialState: initialStoreState
          })
        ]
      }
    })

    basketStore = useBasketStore()
    globalStore = useGlobalStore()
  }

  test.each([
    {
      basketId: null,
      expectedResult: false
    },
    {
      basketId: 1,
      expectedResult: true
    }
  ])(
    'upsell component should be visible or hidden based on showComponent prop and basketId value',
    async ({ basketId, expectedResult }) => {
      getBasketCookie.mockImplementation(() => ({ basketId }))

      createComponent()

      await nextTick()

      const upsellComponent = findDomEl('upsell-component-id')

      expect(upsellComponent.exists()).toBe(expectedResult)
    }
  )

  test.each([
    {
      dataFetcherResponse: [],
      expectedResult: false
    },
    {
      dataFetcherResponse: [dataFetcherMockData],
      expectedResult: true
    }
  ])(
    'upsell component should be visible or hidden based on showComponent prop and data from dataFetcher API',
    async ({ dataFetcherResponse, expectedResult }) => {
      dataFetcher.mockImplementation(() => {
        return dataFetcherResponse
      })

      getBasketCookie.mockImplementation(() => ({ basketId: 1 }))

      createComponent()

      await flushPromises()

      const upsellWrapper = findDomEl('upsell-component-id')

      expect(upsellWrapper.exists()).toBe(expectedResult)
    }
  )

  test.each([
    {
      dataFetcherError: true,
      expectedResult: false
    },
    {
      dataFetcherError: false,
      expectedResult: true
    }
  ])(
    'upsell component should be visible or hidden based on showComponent prop and data from dataFetcher API',
    async ({ dataFetcherError, expectedResult }) => {
      if (dataFetcherError) {
        dataFetcher.mockImplementation(() => {
          throw Error
        })
      } else {
        dataFetcher.mockImplementation(() => {
          return [{ data: 1 }]
        })
      }

      getBasketCookie.mockImplementation(() => ({ basketId: 1 }))

      createComponent()

      await flushPromises()

      const upsellWrapper = findDomEl('upsell-component-id')

      expect(upsellWrapper.exists()).toBe(expectedResult)
    }
  )

  test('api has been called with expected parameters', () => {
    const baksetId = 1
    const siteName = 'site-test-name'
    const props = {
      fields: {
        MaxNumberOfRelatedProducts: {
          value: 4
        },
        PicassoRelationType: {
          value: 'BASKET'
        }
      }
    }
    const initialStoreState = {
      GlobalStore: {
        siteName: siteName
      }
    }
    const expectedGeneratedString = `/api/catalog/getrelatedproducts?sc_site=${siteName}&basketId=${baksetId}&maxNumberOfRelatedProducts=4&relationType=BASKET`

    getBasketCookie.mockImplementation(() => ({ basketId: baksetId }))

    createComponent({ props, initialStoreState })

    expect(dataFetcher).toHaveBeenCalledWith(expectedGeneratedString)
  })
})
