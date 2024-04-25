import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import BulletList from './BulletList.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('BulletList', () => {
  let wrapper

  const createComponent = (props) => {
    wrapper = shallowMount(BulletList, {
      propsData: props
    })
  }

  test.each([
    {
      bulletList: ['Item 1', 'Item 2', 'Item 3'],
      bulletStyle: 'disc',
      expectedListItems: ['Item 1', 'Item 2', 'Item 3']
    },
    {
      bulletList: ['Apple', 'Banana', 'Orange'],
      bulletStyle: 'square',
      expectedListItems: ['Apple', 'Banana', 'Orange']
    }
  ])('renders bullet list with correct style', ({ bulletList, bulletStyle, expectedListItems }) => {
    createComponent({
      bulletList,
      bulletStyle
    })

    // Check if the component is rendered
    expect(wrapper.exists()).toStrictEqual(true)

    // Check if each list item is rendered correctly
    const listItems = wrapper.findAll('li')
    expect(listItems.length).toStrictEqual(expectedListItems.length)

    expectedListItems.forEach((item, index) => {
      expect(listItems[index].text()).toStrictEqual(item)
    })
  })
})
