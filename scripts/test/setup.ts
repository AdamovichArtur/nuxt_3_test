import { config, enableAutoUnmount } from '@vue/test-utils'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'

import { Component } from 'vue'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.clearAllMocks()
})

beforeAll(() => {
  config.global.renderStubDefaultSlot = true
})

afterAll(() => {
  config.global.renderStubDefaultSlot = false
})

config.global.mocks = {
  $t: (msg: any) => msg,
  $n: (msg: any) => msg
}


export function stubComponent(Component: Component, options?: object, template?: string) {
  return {
    props: Component.props,
    model: Component.model,
    emits: Component.emits,
    template: template || '<div><slot></slot></div>',
    // Allow wrapper.findComponent(Component)/find(Component) to work for stub component
    $_vueTestUtils_original: Component,
    ...options
  }
}
