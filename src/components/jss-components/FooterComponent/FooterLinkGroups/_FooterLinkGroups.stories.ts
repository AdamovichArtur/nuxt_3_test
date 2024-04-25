import type { Meta, StoryObj } from '@storybook/vue3'

import FooterLinkGroups from './_FooterLinkGroups.vue'
import { FooterLinkGroupsProps } from './FooterLinkGroups.d'
import { footerLinkGroupsMockData } from './mock/mock'

const meta: Meta<typeof FooterLinkGroups> = {
  title: 'Jss components / FooterLinkGroups',
  component: FooterLinkGroups,
  tags: ['autodocs'],
  render: (args: FooterLinkGroupsProps) => ({
    components: { FooterLinkGroups },
    setup: () => {
      return { args }
    },
    template: `
    <footer-link-groups
      :fields="args.fields"
    />
    `
  })
}

export default meta

type Story = StoryObj<typeof FooterLinkGroups>

export const FooterLinkGroupsDefault: Story = {
  args: {
    fields: {
      ...footerLinkGroupsMockData.fields,
      Layout: { value: '' }
    }
  }
}

export const FooterLinkGroupsSleek: Story = {
  args: footerLinkGroupsMockData
}

export const FooterLinkGroupsColorful: Story = {
  args: {
    fields: {
      ...footerLinkGroupsMockData.fields,
      Layout: { value: 'colorful' }
    }
  }
}

export const FooterLinkGroupsAccent: Story = {
  args: {
    fields: {
      ...footerLinkGroupsMockData.fields,
      Layout: { value: 'accent' }
    }
  }
}
