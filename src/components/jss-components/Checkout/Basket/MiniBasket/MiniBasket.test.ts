import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useGlobalStore } from '@/stores/GlobalStore'
import MiniBasket from './MiniBasket.vue'

beforeEach(() => {
  vi.resetModules()
})

vi.mock('@/utils/composables/cookieManager', () => ({
  getBasketCookie: () => vi.fn()
}))

describe('MiniBasket', () => {
  let wrapper
  let globalStore

  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {}, initialStoreState = {} } = {}) => {
    wrapper = shallowMount(MiniBasket, {
      propsData: props,

      global: {
        mocks: {
          $t: (msg: any) => msg
        },

        plugins: [
          createTestingPinia({
            initialState: initialStoreState
          })
        ],
        stubs: {
          I18nN: true
        }
      }
    })
    globalStore = useGlobalStore()
  }

  test.each([
    {
      BasketPageUrl: '/test-url',
      ShowPrices: {
        value: true
      },
      storePatch: {
        basketPageUrl: '/',
        basketSize: 2,
        basketTotal: '100.10$'
      },
      expectedResult: true
    },
    {
      BasketPageUrl: '/test-url',
      ShowPrices: {
        value: false
      },
      storePatch: {
        basketPageUrl: '/',
        basketSize: 2,
        basketTotal: '100.10$'
      },
      expectedResult: false
    }
  ])(
    'price block is rendered based on external boolean flag',
    async ({ BasketPageUrl, ShowPrices, storePatch, expectedResult }) => {
      const props = {
        fields: {
          BasketPageUrl,
          ShowPrices
        }
      }

      createComponent({ props })

      globalStore.getBasketCookie = () => vi.fn()
      globalStore.$patch(storePatch)

      await nextTick()

      const pricesBlock = findDomEl('prices-block')

      expect(pricesBlock.exists()).toStrictEqual(expectedResult)
    }
  )
})
