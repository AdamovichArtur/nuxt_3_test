import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import VoucherVisibilityControl from './VoucherVisibilityControl.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('VoucherVisibilityControl', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {} } = {}) => {
    wrapper = shallowMount(VoucherVisibilityControl, {
      propsData: props
    })
  }

  test.each([
    {
      isVoucherActive: true,
      expectedClass: 'test-rotate-0'
    },
    {
      isVoucherActive: false,
      expectedClass: 'test-rotate-180'
    }
  ])(
    'arrow icon should apply valid classes based on voucher title state: active or inactive',
    ({ isVoucherActive, expectedClass }) => {
      const props = {
        modelValue: isVoucherActive
      }

      createComponent({ props })

      const baseIconComponent = findComponent('test-base-icon-id')

      expect(baseIconComponent.classes()).toContain(expectedClass)
    }
  )
})
