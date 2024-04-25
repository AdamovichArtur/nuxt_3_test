import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'

import Voucher from './Voucher.vue'

beforeEach(() => {
  vi.resetModules()
})

vi.mock('lodash', async () => {
  const  actual: any = await vi.importActual("lodash")
  actual.default.debounce = vi.fn().mockImplementation((fn) => fn)
  return actual
})

describe('Voucher', () => {
  let wrapper : any
  let basketStore: any

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {} } = {}) => {
    wrapper = shallowMount(Voucher, {
      propsData: props,
      plugins: [createTestingPinia()]
    })

    basketStore = useBasketStore()
  }

  test.each([
    {
      isClicked: false
    },
    {
      isClicked: true
    }
  ])(
    'voucher controls container should be visible or hidden if voucher title has been clicked or has not been clicked',
    async ({ isClicked }) => {
      createComponent({
        props: {
          fields: {}
        }
      })

      if (isClicked) {
        const voucherVisibilityControlComponent = findComponent(
          'voucher-visibility-control-test-id'
        )

        voucherVisibilityControlComponent.trigger('click')

        await nextTick()

        const voucherControlsContainerDomEl = findDomEl('voucher-controls-container-test-id')

        expect(voucherControlsContainerDomEl.element.style.display).not.toBe('none')
      } else {
        const voucherControlsContainerDomEl = findDomEl('voucher-controls-container-test-id')

        expect(voucherControlsContainerDomEl.element.style.display).toBe('none')
      }
    }
  )

  test.each([
    {
      voucherCode: '15OFF'
    },
    {
      voucherCode: ''
    }
  ])(
    'voucher controls container should be visible or hidden if voucher title has been clicked or has not been clicked',
    async ({ voucherCode }) => {
      basketStore.basket = {
        ...basketStore.basket,
        voucher: {
          VoucherCode: voucherCode
        }
      }

      createComponent({
        props: {
          fields: {}
        }
      })

      if (voucherCode.length) {
        const voucherVisibilityControlComponent = findComponent(
          'voucher-visibility-control-test-id'
        )

        voucherVisibilityControlComponent.trigger('click')

        await nextTick()

        const voucherControlsContainerDomEl = findDomEl('voucher-controls-container-test-id')

        expect(voucherControlsContainerDomEl.element.style.display).not.toBe('none')
      } else {
        const voucherControlsContainerDomEl = findDomEl('voucher-controls-container-test-id')

        expect(voucherControlsContainerDomEl.element.style.display).toBe('none')
      }
    }
  )

  test('voucher should be visible', () => {
    createComponent({
      props: {
        fields: {
          VoucherSettings: {
            EnableVoucherForm: {
              value: true
            }
          }
        }
      }
    })

    const voucherControlComponent = findComponent('voucher-controls-test-id')
    expect(voucherControlComponent.exists()).toStrictEqual(true)
  })

  test('voucher should not be visible', () => {
    createComponent({
      props: {
        fields: {
          VoucherSettings: {
            EnableVoucherForm: {
              value: false
            }
          }
        }
      }
    })

    const voucherControlComponent = findComponent('voucher-controls-test-id')
    expect(voucherControlComponent.exists()).toStrictEqual(false)
  })

  test('applyVoucher store method code should be triggered when component generates an apply voucher event', () => {
    createComponent({
      props: {
        fields: {}
      }
    })

    const testVoucherCode = 'VoucherCode'

    const voucherControlComponent = findComponent('voucher-controls-test-id')

    voucherControlComponent.vm.$emit('apply-voucher', { voucherCode: testVoucherCode })

    expect(basketStore.applyVoucher).toHaveBeenCalledWith(testVoucherCode)
  })

  test('if voucher code is not empty, the applyVoucher store method should be called with expected parameters', async () => {
    createComponent({
      props: {
        fields: {
          VoucherSettings: {
            VoucherMessageValid: {
              value: 'valid message'
            }
          }
        }
      }
    })

    const testVoucherCode = 'VoucherCode'

    const voucherControlComponent = findComponent('voucher-controls-test-id')

    voucherControlComponent.vm.$emit('apply-voucher', { voucherCode: testVoucherCode })

    await nextTick()

    expect(basketStore.applyVoucher).toHaveBeenCalledWith(testVoucherCode)
  })

  test('if voucher code is empty, the setVoucherValidationRule store method should be called with expected parameters', async () => {
    const invalidMessage = 'Invalid message'

    createComponent({
      props: {
        fields: {
          VoucherSettings: {
            VoucherMessageError: {
              value: invalidMessage
            }
          }
        }
      }
    })

    const testVoucherCode = ''

    const voucherControlComponent = findComponent('voucher-controls-test-id')

    voucherControlComponent.vm.$emit('apply-voucher', { voucherCode: testVoucherCode })

    await nextTick()

    expect(basketStore.setVoucherValidationRule).toHaveBeenCalledWith({
      ValidationMessage: invalidMessage,
      IsVoucherValid: false
    })
  })

  test('deleteVoucher store method should be triggered when component generates a deleteVoucher event', () => {
    createComponent({
      props: {
        fields: {}
      }
    })

    const voucherControlComponent = findComponent('voucher-controls-test-id')

    voucherControlComponent.vm.$emit('delete-voucher')

    expect(basketStore.deleteVoucher).toHaveBeenCalled()
  })
})
