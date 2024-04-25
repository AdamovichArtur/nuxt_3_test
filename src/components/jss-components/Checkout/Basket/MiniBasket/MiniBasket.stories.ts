import { watch, ref } from 'vue'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'
import { vueRouter } from 'storybook-vue3-router'
import type { Meta, StoryObj } from '@storybook/vue3'

import MiniBasket from './MiniBasket.vue'
import { MiniBasketProps } from './MiniBasket.d'

const meta: Meta<typeof MiniBasket> = {
  title: 'Jss components / MiniBasket',
  component: MiniBasket,
  tags: ['autodocs'],
  parameters: {
    deepControls: { enabled: true }
  },
  decorators: [vueRouter()],
  render: (args: MiniBasketProps) => ({
    components: { MiniBasket },
    created: () => {
      const basketStore = useBasketStore()

      basketStore.setBasketItems([{}, {}, {}], 2, 100, 95)
    },
    setup: () => {
      const key = ref(0)

      watch(
        () => args,
        () => {
          key.value += 1
        },
        {
          deep: true
        }
      )

      return { args, key }
    },
    template: `
    <mini-basket
      :key="key"
      :fields="args.fields" 
    />
    `
  }),
  argTypes: {
    'fields.ShowPrices.value': {
      control: 'boolean'
    }
  }
}
export default meta

type Story = StoryObj<typeof MiniBasket>

export const MiniBasketWithPrice: Story = {
  args: {
    fields: {
      ShowPrices: {
        value: true
      }
    }
  }
}
