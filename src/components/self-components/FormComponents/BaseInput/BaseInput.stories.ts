import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import { BaseInputProps } from './BaseInput.d'
import BaseInput from './BaseInput.vue'

const meta: Meta<typeof BaseInput> = {
  title: 'Kitchen Sink/Input',
  component: BaseInput,
  tags: ['autodocs'],
  render: (args: BaseInputProps) => ({
    components: { BaseInput },
    setup() {
      const userInput = ref(null)
      const isValid = ref(null)

      return {
        args,
        userInput,
        isValid
      }
    },
    template: `<base-input v-bind="args" v-model:user-input="userInput" v-model:is-valid="isValid"/>
      <div>Data: {{userInput}}</div>
      <div>Is data valid: {{isValid}}</div>
    `
  }),
  argTypes: {
    validationMarkerType: {
      options: ['none', 'round', 'icon'],
      control: 'select'
    }
  }
}

export default meta

type Story = StoryObj<typeof BaseInput>

export const ValidationMarker: Story = {
  args: {
    label: 'Label',
    required: true,
    pattern: '[0-9]{4}',
    validationMarkerType: 'icon'
  }
}

export const ValidationLabels: Story = {
  args: {
    label: 'Label:',
    pattern: '[0-9]{4}',
    validLabel: 'Success',
    invalidLabel: 'Error'
  }
}
