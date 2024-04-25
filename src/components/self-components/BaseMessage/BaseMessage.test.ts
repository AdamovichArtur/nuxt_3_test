import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import BaseMessage from './BaseMessage.vue'
import { MessageType } from './BaseMessage.d'

let wrapper: any
const props = [
  {
    type: MessageType.Error,
    messageText: 'Error message',
    doesContentRender: true,
    expectedClass: 'test-error-class'
  },
  {
    type: MessageType.Warning,
    messageText: 'Warning message',
    doesContentRender: true,
    expectedClass: 'test-warning-class'
  },
  {
    type: 'info',
    messageText: 'Info message',
    doesContentRender: true,
    expectedClass: 'test-info-class'
  },
  {
    type: 4,
    doesContentRender: false
  }
]
const createComponent = (prop) => {
  wrapper = shallowMount(BaseMessage, {
    propsData: prop
  })
}
describe('BaseMessage', () => {
  test.each(props)('all components are rendered as they should', (prop) => {
    createComponent(prop)

    if (!prop.doesContentRender) {
      expect(wrapper.find('[data-test-id="base-message-id"]').exists()).toBe(false)
    } else {
      const message = wrapper.findComponent('[data-test-id="base-message-id"]')
      expect(message.exists()).toBe(true)
    }
  })

  test.each(props)('adds class type correctly', (prop) => {
    createComponent(prop)

    const message = wrapper.find('[data-test-id="base-message-id"]')
    if (prop.doesContentRender) {
      expect(message.classes()).toContain(prop.expectedClass)
    }
  })
})
