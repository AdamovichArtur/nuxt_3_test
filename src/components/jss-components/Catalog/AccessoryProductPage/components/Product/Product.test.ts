import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'
import Product from './Product.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ProductCardItem', () => {
  let wrapper
  let basketStore

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {}, provide = {}, initialStoreState = {} } = {}) => {
    const defaultProvide = {
      categoryPageUrl: '',
      isListingPage: false,
      USPListVisibilityClasses: '',
      basketSettings: {
        basketPageUrl: '/basket',
        hasBasket: false,
        basket: {
          items: [],
          basketSize: null,
          basketTotal: null
        },
        showPricesWithVat: true
      }
    }
    wrapper = shallowMount(Product, {
      propsData: props,

      global: {
        provide: { ...defaultProvide, ...provide },
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
    basketStore = useBasketStore()
  }

  test('usp component provides data', () => {
    const props = {
      fields: {
        ProductUspList: ['test', 'test2']
      }
    }
    createComponent({ props })

    const usp = findComponent('usp-component')

    expect(usp.props('bulletList')).toStrictEqual(props.fields.ProductUspList)
  })

  test.each([
    {
      props: {
        fields: {
          Prices: {
            HasDiscount: true,
            DiscountedPrice: {
              PriceWithVat: '1'
            }
          }
        }
      },
      storePatch: {
        showPricesWithVat: true
      },
      result: '1'
    },
    {
      props: {
        fields: {
          Prices: {
            HasDiscount: true,
            DiscountedPrice: {
              PriceExVat: '2'
            }
          }
        }
      },
      storePatch: {
        showPricesWithVat: false
      },
      result: '2'
    },
    {
      props: {
        fields: {
          Prices: {
            HasDiscount: false,
            Price: {
              PriceWithVat: '3'
            }
          }
        }
      },
      storePatch: {
        showPricesWithVat: true
      },
      result: '3'
    },
    {
      props: {
        fields: {
          Prices: {
            HasDiscount: false,
            Price: {
              PriceExVat: '4'
            }
          }
        }
      },
      storePatch: {
        showPricesWithVat: false
      },
      result: '4'
    }
  ])('price component provides data', async ({ props, storePatch, result }) => {
    createComponent({ props })

    basketStore.$patch(storePatch)

    await nextTick()

    const price = findComponent('price-component')

    expect(price.attributes('value')).toBe(result)
  })

  test('click button add product to basket store', async () => {
    const ID_ITEM = 'test-id'
    const props = {
      fields: {
        ProductData: { Id: ID_ITEM }
      }
    }

    createComponent({ props })

    const button = findComponent('button-component')

    button.trigger('click')
    await nextTick()

    expect(basketStore.addToBasket).toHaveBeenCalledWith(ID_ITEM)
    expect(basketStore.addToBasket).toHaveBeenCalledOnce()
  })
})
