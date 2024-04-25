import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import BaseSelect from './BaseSelect.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('BaseSelect', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = mount(BaseSelect, {
      propsData: props
    })
  }

  test.each([
    {
      props: {
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
      },
      doesContentRender: true
    },
    {
      props: {
        options: [
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
          { id: 3, name: 'Option 3' },
          { id: 4, name: 'Option 4' },
          { id: 5, name: 'Option 5' }
        ],
        itemKey: 'name'
      },
      doesContentRender: true
    }
  ])('selectComponent renders correctly', ({ props, doesContentRender }) => {
    createComponent(props)

    const baseSelect = findComponent('base-select-id')

    expect(baseSelect.exists()).toStrictEqual(doesContentRender)
  })

  test.each([
    {
      props: {
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
      },
      newValue: 'new value'
    },
    {
      props: {
        options: ['Option 20', 'Option 40', 'Option 10']
      },
      newValue: 'Option 40'
    }
  ])('should trigger update:modelValue event', async ({ props, newValue }) => {
    createComponent(props)

    await wrapper.vm.$emit('update:modelValue', newValue)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(newValue)
  })

  test.each([
    {
      options: [{ id: 1, name: 'Option 1' }],
      containsObjectsResult: true
    },
    {
      options: ['Option 1', 'Option 2'],
      containsObjectsResult: false
    }
  ])(
    'containsObjects should return the correct result based on options array',
    ({ options, containsObjectsResult }) => {
      createComponent({
        options
      })

      const result = wrapper.vm.containsObjects(options)

      expect(result).toStrictEqual(containsObjectsResult)
    }
  )

  test.each([
    {
      props: {
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
        label: 'Select an option'
      },
      hasLabel: true
    },
    {
      props: {
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
        label: ''
      },
      hasLabel: false
    }
  ])('label should be shown or hidden based on label prop', ({ props, hasLabel }) => {
    createComponent(props)

    const labelElement = findDomEl('label-id')

    expect(labelElement.exists()).toStrictEqual(hasLabel)
  })

  test.each([
    {
      options: ['Option 1', 'Option 2'],
      disabled: true
    },
    {
      options: ['Option 1', 'Option 2'],
      disabled: false
    }
  ])('renders correct class based on disabled prop', ({ options, disabled }) => {
    createComponent({
      options,
      disabled
    })

    const buttonElement = findDomEl('button-id')

    expect(buttonElement.classes('cursor-not-allowed')).toStrictEqual(disabled)
  })

  test.each([
    {
      props: {
        options: [
          { id: '1', option: 'Option 2' },
          { id: '1', option: 'Option 1' }
        ],
        idKey: 'id',
        itemKey: 'option'
      },
      expectedOptions: ['Option 1', 'Option 2']
    },
    {
      props: {
        options: [
          { category: 'A', type: '453565' },
          { category: 'B', type: '23424' },
          { category: 'B', type: '345345' }
        ],
        idKey: 'id',
        itemKey: 'type'
      },
      expectedOptions: ['23424', '345345', '453565']
    }
  ])(
    'renders correct options when given an array of objects',
    async ({ props, expectedOptions }) => {
      createComponent(props)

      const buttonElement = findDomEl('button-id')

      buttonElement.trigger('click')

      await nextTick()

      expect(buttonElement.attributes('data-headlessui-state')).toBe('open')

      const options = findDomEl('options-id').findAll('li')
      expect(options.length).toStrictEqual(expectedOptions.length)

      expectedOptions.forEach((item, index) => {
        expect(options[index].text()).toStrictEqual(item)
      })
    }
  )
})
