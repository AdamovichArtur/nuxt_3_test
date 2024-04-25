import type { Meta, StoryObj } from '@storybook/vue3'

import BaseMessage from './BaseMessage.vue'
import { MessageType } from './BaseMessage.d'

const messageText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const meta: Meta<typeof BaseMessage> = {
  title: 'Kitchen Sink/Message',
  component: BaseMessage,
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseMessage },
    setup() {
      return { args }
    },
    template: `<base-message v-bind="args" />`
  }),
  argTypes: {
    type: {
      options: [MessageType.Error, MessageType.Info, MessageType.Success, MessageType.Warning],
      control: 'select'
    }
  }
}
export default meta

type Story = StoryObj<typeof BaseMessage>

export const Error: Story = {
  args: {
    type: MessageType.Error,
    messageText: 'Short message'
  }
}

export const Warning: Story = {
  args: {
    type: MessageType.Warning,
    messageText
  }
}

export const Info: Story = {
  args: {
    type: MessageType.Info,
    messageText
  }
}

export const Success: Story = {
  args: {
    type: MessageType.Success,
    messageText
  }
}
export const AlternativeIcon: Story = {
  args: {
    type: MessageType.Success,
    messageText,
    messageIcon: 'chevron-down-light'
  }
}
