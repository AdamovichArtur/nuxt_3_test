import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import VoucherControls from './VoucherControls.vue'
import { VoucherStatuses } from './VoucherControls.d'

beforeEach(() => {
  vi.resetModules()
})

describe('VoucherControls', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {} } = {}) => {
    wrapper = shallowMount(VoucherControls, {
      propsData: props
    })
  }

  test.each([
    {
      voucherStatus: VoucherStatuses.NotExist,
      expectedClass: 'test-opacity-class'
    },
    {
      voucherStatus: VoucherStatuses.Invalid,
      expectedClass: 'test-invalid-class'
    },
    {
      voucherStatus: VoucherStatuses.Valid,
      expectedClass: 'test-valid-class'
    },
    {
      voucherStatus: VoucherStatuses.NoProducts,
      expectedClass: 'test-valid-class'
    },
    {
      voucherStatus: '',
      expectedClass: 'test-opacity-class'
    }
  ])(
    'contribution fee block should be shown or hidden based on fee label and fee value',
    ({ voucherStatus, expectedClass }) => {
      const props = {
        placeholderText: 'Placeholder test text',
        buttonText: {
          value: 'Button test text'
        },
        voucherCode: 'test voucher code',
        notificationMessage: {
          value: 'Some test message'
        },
        voucherStatus
      }

      createComponent({ props })

      const baseIconComponent = findDomEl('test-notification-block-id')

      expect(baseIconComponent.classes()).toContain(expectedClass)
    }
  )

  test.each([
    {
      voucherStatus: VoucherStatuses.Valid,
      expectedVisibility: false
    },
    {
      voucherStatus: VoucherStatuses.Invalid,
      expectedVisibility: true
    }
  ])(
    'warning icon should be visible or hidden based on vocuher status',
    ({ voucherStatus, expectedVisibility }) => {
      const props = {
        placeholderText: 'Placeholder test text',
        buttonText: {
          value: 'Button test text'
        },
        notificationMessage: {
          value: 'Some test message'
        },
        voucherCode: 'test voucher code',
        voucherStatus
      }

      createComponent({ props })

      const baseIconComponent = findComponent('test-base-icon-id')

      expect(baseIconComponent.exists()).toBe(expectedVisibility)
    }
  )

  test.each([
    {
      notificationMessage: 'Some test notification message',
      expectedVisibility: true
    },
    {
      notificationMessage: '',
      expectedVisibility: false
    }
  ])(
    'notification block should be visible or hidden based on notification message length',
    ({ notificationMessage, expectedVisibility }) => {
      const props = {
        placeholderText: 'Placeholder test text',
        buttonText: {
          value: 'Button test text'
        },
        notificationMessage: {
          value: notificationMessage
        },
        voucherCode: 'test voucher code'
      }

      createComponent({ props })

      const notificationBlock = findDomEl('test-notification-block-id')

      expect(notificationBlock.exists()).toBe(expectedVisibility)
    }
  )

  test.each([
    {
      voucherCode: 'test voucher code',
      expectedVisibility: true
    },
    {
      voucherCode: '',
      expectedVisibility: false
    }
  ])(
    'notification block should be visible or hidden based on voucher code length',
    ({ voucherCode, expectedVisibility }) => {
      const props = {
        placeholderText: 'Placeholder test text',
        buttonText: {
          value: 'Button test text'
        },
        notificationMessage: {
          value: 'Some test notification message'
        },
        voucherCode
      }

      createComponent({ props })

      const notificationBlock = findDomEl('test-notification-block-id')

      expect(notificationBlock.exists()).toBe(expectedVisibility)
    }
  )

  test.each([
    {
      voucherStatus: VoucherStatuses.Valid,
      expectedVisibility: true
    },
    {
      voucherStatus: VoucherStatuses.Invalid,
      expectedVisibility: false
    }
  ])(
    'delete button should be visible or hidden based on vocuher status',
    ({ voucherStatus, expectedVisibility }) => {
      const props = {
        placeholderText: 'Placeholder test text',
        buttonText: {
          value: 'Button test text'
        },
        notificationMessage: {
          value: 'Some test message'
        },
        voucherCode: 'test voucher code',
        voucherStatus
      }

      createComponent({ props })

      const deleteButtonComponent = findComponent('delete-button-test-id')

      expect(deleteButtonComponent.exists()).toBe(expectedVisibility)
    }
  )

  test('delete button should emit deleteVoucher event when it is clicked', async () => {
    const props = {
      placeholderText: 'Placeholder test text',
      buttonText: {
        value: 'Button test text'
      },
      notificationMessage: {
        value: 'Some test message'
      },
      voucherCode: 'test voucher code',
      voucherStatus: VoucherStatuses.Valid
    }

    createComponent({ props })

    const deleteButtonComponent = findComponent('delete-button-test-id')

    deleteButtonComponent.trigger('click')

    await nextTick()

    expect(wrapper.emitted().deleteVoucher.length).toStrictEqual(1)
  })
})
