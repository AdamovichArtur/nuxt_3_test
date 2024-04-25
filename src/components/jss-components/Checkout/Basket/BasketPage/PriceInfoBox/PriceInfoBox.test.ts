import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'

import { useBasketStore } from '@/stores/BasketStore/BasketStore'

import PriceInfoBox from './PriceInfoBox.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ProductOverviewInfo', () => {
  let wrapper
  let basketStore

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {}, stubActions = true } = {}) => {
    wrapper = shallowMount(PriceInfoBox, {
      propsData: {
        fields: {},
        ...props
      },
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
          I18nN: true
        }
      }
    })

    basketStore = useBasketStore()
  }

  test('title component provides valid data', () => {
    const props = {
      fields: {
        PriceOverviewHeaderText: {
          value: 'test'
        }
      }
    }

    createComponent({ props })

    const titleComponent = findComponent('title-component')

    expect(titleComponent.props('field')).toStrictEqual(props.fields.PriceOverviewHeaderText)
  })

  test('sub total component provides valid data', () => {
    const props = {
      fields: {
        SubTotalText: {
          value: 'test'
        }
      }
    }

    createComponent({ props })

    const titleComponent = findComponent('sub-total-text')

    expect(titleComponent.props('field')).toStrictEqual(props.fields.SubTotalText)
  })

  test('delivery component provides valid data', () => {
    const props = {
      fields: {
        DeliveryFeeText: {
          value: 'test'
        }
      }
    }

    createComponent({ props })

    const titleComponent = findComponent('delivery-text')

    expect(titleComponent.props('field')).toStrictEqual(props.fields.DeliveryFeeText)
  })

  test('discount component provides valid data', async () => {
    const props = {
      fields: {
        TotalCampaignDiscountText: {
          value: 'test'
        }
      }
    }

    createComponent({ props })
    basketStore.$patch({
      basket: {
        basketPriceConfig: {
          ProductsPrice: {
            DiscountedPriceWithVat: 1,
            PriceWithVat: 2,
            HasDiscount: true
          }
        }
      }
    })
    await nextTick()
    const titleComponent = findComponent('discount-text')

    expect(titleComponent.props('field')).toStrictEqual(props.fields.TotalCampaignDiscountText)
  })

  test('sub total component calculate valid count', async () => {
    const count = 1
    createComponent()
    basketStore.$patch({
      basket: {
        basketPriceConfig: {
          ProductsPrice: {
            PriceWithVat: count
          }
        }
      }
    })
    await nextTick()

    const countComponent = findDomEl('sub-total-sum')
    expect(countComponent.attributes('value')).toBe(String(count))
  })

  test('delivery component calculate valid count', async () => {
    const count = 1
    createComponent()
    basketStore.$patch({
      basket: {
        basketPriceConfig: {
          TotalDeliveryFee: {
            PriceWithVat: count
          }
        }
      }
    })
    await nextTick()

    const countComponent = findDomEl('delivery-sum')

    expect(countComponent.attributes('value')).toBe(String(count))
  })
  test('fee component calculate valid count', async () => {
    const count = 1
    createComponent()
    basketStore.getBasketFee = count
    await nextTick()

    const countComponent = findDomEl('fee-sum')

    expect(countComponent.attributes('value')).toBe(String(count))
  })

  test.each([
    {
      config: {
        ProductsPrice: {
          DiscountedPriceWithVat: 1,
          PriceWithVat: 2,
          HasDiscount: true
        }
      },
      expected: 1
    },
    {
      config: {
        ProductsPrice: {
          DiscountedPriceWithVat: 1,
          PriceWithVat: 3,
          HasDiscount: true
        }
      },
      expected: 2
    },
    {
      config: {
        ProductsPrice: {
          DiscountedPriceWithVat: 1,
          HasDiscount: false
        }
      },
      expected: 0
    },
    {
      config: {
        ProductsPrice: {
          DiscountedPriceWithVat: 0,
          HasDiscount: true
        }
      },
      expected: 0
    }
  ])('discount component calculate valid count', async ({ config, expected }) => {
    createComponent()

    basketStore.$patch({
      basket: {
        basketPriceConfig: config
      }
    })

    await nextTick()

    const countComponent = findDomEl('discount-sum')
    if (expected) {
      expect(countComponent.attributes('value')).toBe(String(expected))
    }
  })
  test.each([
    {
      config: {
        ProductsPrice: {
          DiscountedPriceWithVat: 1,
          HasDiscount: true
        },
        TotalDeliveryFee: {
          PriceWithVat: 1
        }
      },
      fee: 0,
      expected: 2
    },
    {
      config: {
        ProductsPrice: {
          PriceWithVat: 1,
          DiscountedPriceWithVat: 0,
          HasDiscount: true
        },
        TotalDeliveryFee: {
          PriceWithVat: 1
        }
      },
      fee: 0,
      expected: 1
    },
    {
      config: {
        ProductsPrice: {
          PriceWithVat: 1,
          DiscountedPriceWithVat: 1,
          HasDiscount: false
        },
        TotalDeliveryFee: {
          PriceWithVat: 1
        }
      },
      fee: 0,
      expected: 2
    },
    {
      config: {
        ProductsPrice: {
          PriceWithVat: 1,
          DiscountedPriceWithVat: 0,
          HasDiscount: false
        },
        TotalDeliveryFee: {
          PriceWithVat: 1
        }
      },
      fee: 1,
      expected: 3
    }
  ])('total sum component calculate valid count', async ({ config, expected, fee }) => {
    createComponent()

    basketStore.$patch({
      basket: {
        basketPriceConfig: config
      }
    })
    basketStore.getBasketFee = fee

    await nextTick()

    const countComponent = findComponent('total-sum')
    expect(countComponent.props('totalSum')).toStrictEqual(expected)
  })
})
