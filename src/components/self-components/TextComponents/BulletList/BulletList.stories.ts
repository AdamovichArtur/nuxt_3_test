import type { Meta, StoryObj } from '@storybook/vue3'

import { BulletListProps } from './BulletList'
import BulletList from './BulletList.vue'

const meta: Meta<typeof BulletList> = {
  title: 'Kitchen Sink/BulletList',
  component: BulletList,
  tags: ['autodocs'],
  render: (args: BulletListProps) => ({
    components: { BulletList },
    setup() {
      return { args }
    },
    template: `<bullet-list v-bind="args" />`
  }),
  argTypes: {
    bulletStyle: {
      options: ['none', 'disc', 'square', 'checkmark', 'chevron'],
      control: 'select'
    }
  }
}

export default meta

type Story = StoryObj<typeof BulletList>

export const Simple: Story = {
  args: {
    bulletList: ['CVU', 'GHL', 'VIU', 'CSP', 'GEL', 'GPU', 'VLT', 'GGL'],
    bulletStyle: 'checkmark'
  }
}
