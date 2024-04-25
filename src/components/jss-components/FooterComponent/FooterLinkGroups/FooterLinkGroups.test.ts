import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import FooterLinkGroups from './_FooterLinkGroups.vue'

const useBreakpointsMockFn = vi.hoisted(() => vi.fn())

vi.mock('@/utils/composables/viewport/useBreakpoints', () => {
  return {
    default: useBreakpointsMockFn.mockImplementation(() => {
      return {
        isMobile: false
      }
    })
  }
})

beforeEach(() => {
  vi.resetModules()
})

describe('FooterLinkGroups', () => {
  let wrapper

  const findComponent = (testId = '') => wrapper.findComponent(`[data-test-id="${testId}"]`)
  const findDomEl = (testId = '') => wrapper.find(`[data-test-id="${testId}"]`)

  const createComponent = ({ props = {} } = {}) => {
    wrapper = shallowMount(FooterLinkGroups, {
      propsData: props
    })
  }

  test.each([
    {
      fields: {
        Layout: { value: 'test-layout' }
      },
      expectedResult: true
    },
    {
      Layout: { value: '' },
      expectedResult: false
    }
  ])('footer link wrapper class contains provided modifier', ({ fields, expectedResult }) => {
    const props = {
      fields
    }

    const expectedClass = 'test-modifier'

    createComponent({ props })

    const linkGroupsWrapper = findDomEl('test-id-modifier')

    if (expectedResult) {
      expect(linkGroupsWrapper.classes()).toContain(expectedClass)
    } else {
      expect(linkGroupsWrapper.classes()).not.toContain(expectedClass)
    }
  })

  test('expanded header element contains expected class when clicked and not clicked', async () => {
    const expectedClass = 'test-class-expanded'

    const props = {
      fields: {
        Layout: { value: 'test-layout' },
        LinkGroups: [
          {
            expanded: false
          }
        ]
      }
    }

    useBreakpointsMockFn.mockImplementation(() => {
      return {
        isMobile: {
          value: true
        }
      }
    })

    createComponent({ props })

    const chevronIcon = findComponent('test-id-base-icon')

    expect(chevronIcon.classes()).not.toContain(expectedClass)

    await nextTick()

    const headerWrapperListItem = findDomEl('test-id-expand')

    headerWrapperListItem.trigger('click')

    await nextTick()

    expect(chevronIcon.classes()).toContain(expectedClass)
  })

  test('content of expandable list should be hidden or visible based on expanded value', async () => {
    const expectedVisibleClass = 'test-class-visible'
    const expectedInvisibleClass = 'test-class-invisible'

    const props = {
      fields: {
        Layout: { value: 'test-layout' },
        LinkGroups: [
          {
            expanded: false
          }
        ]
      }
    }

    useBreakpointsMockFn.mockImplementation(() => {
      return {
        isMobile: {
          value: true
        }
      }
    })

    createComponent({ props })

    const expandableContent = findDomEl('test-id-links-wrapper')

    expect(expandableContent.classes()).toContain(expectedInvisibleClass)

    await nextTick()

    const headerWrapperListItem = findDomEl('test-id-expand')

    headerWrapperListItem.trigger('click')

    await nextTick()

    expect(expandableContent.classes()).toContain(expectedVisibleClass)
  })

  test.each([
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { Label: { value: '' } } }] },
          expanded: false
        }
      ],
      expectedResult: false
    },
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { Label: { value: 'Label test value' } } }] },
          expanded: false
        }
      ],
      expectedResult: true
    }
  ])(
    'link item should be hidden or visible based on label value',
    ({ Layout, LinkGroups, expectedResult }) => {
      const props = {
        fields: {
          Layout,
          LinkGroups
        }
      }

      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile: {
            value: true
          }
        }
      })

      createComponent({ props })

      const linkItem = findDomEl('test-id-link-item')

      expect(linkItem.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { ImageLinks: [] } }] },
          expanded: false
        }
      ],
      expectedResult: false
    },
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { ImageLinks: [{ fields: {} }] } }] },
          expanded: false
        }
      ],
      expectedResult: true
    }
  ])(
    'link item should be hidden or visible based on label value',
    ({ Layout, LinkGroups, expectedResult }) => {
      const props = {
        fields: {
          Layout,
          LinkGroups
        }
      }

      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile: {
            value: true
          }
        }
      })

      createComponent({ props })

      const socialMediaWrapper = findDomEl('test-id-social-wrapper')

      expect(socialMediaWrapper.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { Script: { value: 'script url' } } }] },
          expanded: false
        }
      ],
      expectedResult: true
    },
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { Script: { value: '' } } }] },
          expanded: false
        }
      ],
      expectedResult: false
    }
  ])(
    'script component should be rendered in case data is filled',
    ({ Layout, LinkGroups, expectedResult }) => {
      const props = {
        fields: {
          Layout,
          LinkGroups
        }
      }

      createComponent({ props })

      const externalScriptComponent = findComponent('test-id-external-script-mobile')

      expect(externalScriptComponent.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { ImageLinks: [{ fields: {} }] } }] },
          expanded: false
        }
      ],
      expectedResult: true
    },
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: { Items: [{ fields: { ImageLinks: [] } }] },
          expanded: false
        }
      ],
      expectedResult: false
    }
  ])(
    'social media icons should be rendered in case data is filled',
    ({ Layout, LinkGroups, expectedResult }) => {
      const props = {
        fields: {
          Layout,
          LinkGroups
        }
      }

      createComponent({ props })

      const socialMediaWrapper = findDomEl('test-id-social-media-mobile')

      expect(socialMediaWrapper.exists()).toStrictEqual(expectedResult)
    }
  )

  test.each([
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { ImageLinks: [{ fields: {} }] } }],
            HideHeaderForSmallScreens: { value: true }
          },
          expanded: false
        }
      ],
      expectedResult: 'test-class-visible'
    },
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { ImageLinks: [{ fields: {} }] } }],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: 'test-class-invisible'
    }
  ])(
    'header wrapper should contain visible or invisible classes based on HideHeaderForSmallScreens value',
    ({ Layout, LinkGroups, expectedResult }) => {
      const props = {
        fields: {
          Layout,
          LinkGroups
        }
      }

      createComponent({ props })

      const headerWrapper = findDomEl('test-id-expand')

      expect(headerWrapper.classes()).toContain(expectedResult)
    }
  )

  test.each([
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { ImageLinks: [{ fields: {} }] } }],
            HideHeaderForSmallScreens: { value: true }
          },
          expanded: false
        }
      ],
      expectedResult: true
    },
    {
      Layout: { value: 'test-layout' },
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { ImageLinks: [{ fields: {} }] } }],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: false
    }
  ])(
    'header content should visible or invisible based on HideHeaderForSmallScreens value',
    ({ Layout, LinkGroups, expectedResult }) => {
      const expectedClass = 'test-class-visible'
      const props = {
        fields: {
          Layout,
          LinkGroups
        }
      }

      createComponent({ props })

      const headerContent = findComponent('test-id-header-item')

      if (expectedResult) {
        expect(headerContent.classes()).toContain(expectedClass)
      } else {
        expect(headerContent.classes()).not.toContain(expectedClass)
      }
    }
  )

  test.each([
    { isMobile: false, expectedResult: false },
    { isMobile: true, expectedResult: true }
  ])(
    'content of expandable list should be visible only on mobile view',
    ({ isMobile, expectedResult }) => {
      const expectedVisibleClass = 'test-class-visible'
      const expectedInvisibleClass = 'test-class-invisible'

      const props = {
        fields: {
          Layout: { value: 'test-layout' },
          LinkGroups: [
            {
              expanded: true
            }
          ]
        }
      }

      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile: {
            value: isMobile
          }
        }
      })

      createComponent({ props })

      const expandableContent = findDomEl('test-id-links-wrapper')

      if (expectedResult) {
        expect(expandableContent.classes()).toContain(expectedVisibleClass)
      } else {
        expect(expandableContent.classes()).not.toContain(expectedInvisibleClass)
      }
    }
  )

  test.each([
    {
      isMobile: true,
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { ImageLinks: [{ fields: {} }] } }],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: true
    },
    {
      isMobile: false,
      LinkGroups: [
        {
          fields: {
            Items: [],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: true
    },
    {
      isMobile: false,
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { ImageLinks: [{ fields: {} }] } }],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: true
    },
    {
      isMobile: true,
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { Link: { value: { href: '#' } } } }],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: false
    },
    {
      isMobile: true,
      LinkGroups: [
        {
          fields: {
            Items: [{ fields: { Link: { value: { href: '' } } } }],
            HideHeaderForSmallScreens: { value: false }
          },
          expanded: false
        }
      ],
      expectedResult: true
    }
  ])(
    'footer column should be hidden or shown based on device and length of the links array',
    ({ isMobile, LinkGroups, expectedResult }) => {
      const expectedInvisibleClass = 'test-hidden-class'

      const props = {
        fields: {
          Layout: { value: 'test-layout' },
          LinkGroups
        }
      }

      useBreakpointsMockFn.mockImplementation(() => {
        return {
          isMobile: {
            value: isMobile
          }
        }
      })

      createComponent({ props })

      const expandableContent = findDomEl('test-id-column-wrapper')

      if (expectedResult) {
        expect(expandableContent.classes()).toContain(expectedInvisibleClass)
      } else {
        expect(expandableContent.classes()).not.toContain(expectedInvisibleClass)
      }
    }
  )
})
