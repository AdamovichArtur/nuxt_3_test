import type { Meta, StoryObj } from '@storybook/vue3'

import { VoucherProps } from './Voucher.d'
import Voucher from './Voucher.vue'

const meta: Meta<typeof Voucher> = {
  title: 'Jss components / Voucher',
  component: Voucher,
  tags: ['autodocs'],
  render: (args: VoucherProps) => ({
    components: { Voucher },
    setup() {
      return { args }
    },
    template: `<voucher v-bind="args" />`
  })
}

export default meta

type Story = StoryObj<typeof Voucher>

export const VoucherBasket: Story = {
  args: {
    fields: {
      VoucherHeader: {
        value: 'Apply your voucher code'
      },
      VoucherPlaceholder: {
        value: 'Enter your voucher here'
      },
      VoucherSubmitButtonText: {
        value: 'Apply'
      },
      VoucherErrorText: {
        value: 'Voucher code has not been applied'
      }
    }
  }
}
