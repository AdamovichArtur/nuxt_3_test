import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import { BaseSelectProps } from './BaseSelect.d'
import BaseSelect from './BaseSelect.vue'

const meta: Meta<typeof BaseSelect> = {
  title: 'Kitchen Sink/Dropdowns',
  component: BaseSelect,
  tags: ['autodocs'],
  render: (args: BaseSelectProps) => ({
    components: { BaseSelect },
    setup() {
      const selected = ref([])

      return {
        args,
        selected
      }
    },
    template: `<base-select v-bind="args" v-model="selected"/><div>Data: {{selected}}</div>`
  }),
  argTypes: {
    labelPosition: {
      options: ['default', 'row'],
      control: 'select'
    }
  }
}

export default meta

type Story = StoryObj<typeof BaseSelect>

export const Simple: Story = {
  args: {
    options: [
      'CVU',
      'GHL',
      'VIU',
      'CSP',
      'GEL',
      'GPU',
      'VLT',
      'AGL',
      'BVU',
      'HHL',
      'UIU',
      'PSP',
      'LEL',
      'OPU',
      'ILT',
      'DGL',
      'VAT',
      'AAL',
      'BVA',
      'HAL',
      'UIA',
      'PSA',
      'LAL',
      'OPA',
      'ILA',
      'DAL',
      'AAA',
      'SSSS',
      'DDD',
      'FFF',
      'GGG',
      'HHH',
      'JJJ',
      'KKK',
      'LLL',
      'ZZZ',
      'XXX',
      'CCC',
      'VVV',
      'BBB',
      'NNN',
      'MMM'
    ]
  }
}

export const Objects: Story = {
  args: {
    options: [
      { Type: 'CVU', Category: 'FLAT' },
      { Type: 'CFP', Category: 'FLAT' },
      { Type: 'ABC', Category: 'FLAT' },
      { Type: 'AAE', Category: 'FLAT' },
      { Type: 'CSP', Category: 'FLAT' },
      { Type: 'GBL', Category: 'Roof' },
      { Type: 'CFU', Category: 'FLAT' },
      { Type: 'GCL', Category: 'Roof' },
      { Type: 'CVP', Category: 'FLAT' },
      { Type: 'BVD', Category: 'FLAT' }
    ],
    idKey: 'Type',
    itemKey: 'Type',
    selectionPrompt: 'Please make a selection'
  }
}

export const AllowMultipleSelection: Story = {
  args: {
    options: [
      { Generation: 'V21', Size: 'B04' },
      { Generation: 'V22', Size: 'BK04' },
      { Generation: 'V21', Size: 'C01' },
      { Generation: 'V21', Size: 'C02' },
      { Generation: 'V21', Size: 'C04' },
      { Generation: 'V21', Size: 'C06' },
      { Generation: 'V22', Size: 'CK01' }
    ],
    idKey: 'Size',
    itemKey: 'Size',
    selectMultiple: true,
    selectionPrompt: 'Please make a selection'
  }
}
