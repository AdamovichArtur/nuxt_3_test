import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'
import ProductCard from './ProductCard.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ProductCard', () => {
  let wrapper
  let basketStore

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

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
    wrapper = shallowMount(ProductCard, {
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

  test.each([
    {
      props: {
        product: {
          ProductPageUrl: 'test1'
        }
      },
      provide: {},
      expectUrl: 'test1'
    },
    {
      props: {
        product: { ProductPageUrl: false },

        isListingPage: false
      },
      provide: {
        categoryPageUrl: 'test2'
      },
      expectUrl: 'test2'
    }
  ])('link component provides url', ({ props, expectUrl, provide }) => {
    createComponent({ props, provide })

    const linkComponent = findDomEl('link-component')

    expect(linkComponent.attributes('href')).toStrictEqual(expectUrl)
  })

  test('image component provides data', () => {
    const props = {
      product: {
        ProductSetImage: { value: 'test' }
      }
    }
    createComponent({ props })

    const image = findComponent('image-component')
    expect(image.props('media')).toStrictEqual(props.product.ProductSetImage)
  })

  test('title component provides data', () => {
    const props = {
      product: {
        ProductSetName: { value: 'test' }
      }
    }
    createComponent({ props })

    const title = findComponent('title-component')

    expect(title.props('field')).toStrictEqual(props.product.ProductSetName)
  })

  test.each([
    { provide: { isListingPage: false }, exists: false },
    { provide: { isListingPage: true }, exists: true }
  ])('description component provides data', ({ provide, exists }) => {
    const props = {
      product: {
        ProductCardDescription: { value: 'test' }
      }
    }
    createComponent({ props, provide })

    const description = findComponent('description-component')

    expect(description.exists()).toBe(exists)
    if (exists) {
      expect(description.props('field')).toStrictEqual(props.product.ProductCardDescription)
    }
  })

  test.each([
    {
      props: { product: { USPItems: {} } },
      exists: false,
      value: ''
    },
    {
      props: { product: { USPItems: { value: 'test' } } },
      exists: true,
      value: 'test'
    }
  ])('card component provides data', ({ props, exists, value }) => {
    createComponent({ props })

    const card = findComponent('card-component')

    expect(card.exists()).toBe(exists)

    if (exists) {
      expect(card.props('bulletList')).toStrictEqual(value)
    }
  })

  test.each([
    {
      props: {
        product: {
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
        product: {
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
        product: {
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
        product: {
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
})
