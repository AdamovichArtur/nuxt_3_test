import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import ContentHeader from './ContentHeader.vue'

beforeEach(() => {
  vi.resetModules()
})

describe('ContentHeader', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = (props) => {
    wrapper = shallowMount(ContentHeader, {
      propsData: props
    })
  }

  test.each([
    {
      fields: {
        PageTitle: {
          value: 'Test title'
        },
        PageDescription: {
          value: 'Test description'
        }
      },
      title: {
        value: 'Title'
      },
      description: {
        value: 'Description'
      },
      doesContentRender: true
    },
    {
      fields: {
        PageTitle: {
          value: ''
        },
        PageDescription: {
          value: ''
        }
      },
      title: {
        value: ''
      },
      description: {
        value: ''
      },
      doesContentRender: false
    },
    {
      fields: {
        PageTitle: {
          value: 'Test title'
        },
        PageDescription: {
          value: ''
        }
      },
      title: {
        value: ''
      },
      description: {
        value: ''
      },
      doesContentRender: true
    },
    {
      fields: {},
      title: {
        value: 'Test Title'
      },
      description: {
        value: ''
      },
      doesContentRender: true
    }
  ])(
    'section container should be shown or hidden based on external props: fields, title and description',
    ({ fields, title, description, doesContentRender }) => {
      const props = {
        fields,
        title,
        description
      }

      createComponent(props)

      const sectionContainer = findComponent('section-id')

      expect(sectionContainer.exists()).toStrictEqual(doesContentRender)
    }
  )
})
