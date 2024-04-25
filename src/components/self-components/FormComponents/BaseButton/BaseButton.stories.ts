import type { Meta, StoryObj } from '@storybook/vue3'

import BaseButtonProps from './BaseButton.d'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseButtonProps> = {
  title: 'Kitchen Sink/Button',
  component: BaseButton,
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: `<base-button v-bind="args" />`
  }),
  argTypes: {
    element: {
      options: ['a', 'button'],
      control: 'select'
    },
    chevronDirection: {
      options: ['up', 'right', 'down', 'left'],
      control: 'select'
    },
    chevronPosition: {
      options: ['left', 'right'],
      control: 'select'
    },
    styleImportance: {
      options: ['primary', 'secondary', 'tertiary'],
      control: 'select'
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'select'
    },
    buttonType: {
      options: ['button', 'reset', 'submit'],
      control: 'select'
    }
  }
}

export default meta

type Story = StoryObj<typeof BaseButton>

export const Default: Story = {
  args: {}
}
