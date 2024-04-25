import type { Meta, StoryObj } from '@storybook/vue3'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'

import ProductOverview from './ProductOverview.vue'
import { ProductItemProps } from './ProductOverview.d'
import { productOverviewStaticProps } from './mock/mock'

const meta: Meta<typeof ProductOverview> = {
  title: 'Jss components / ProductOverview',
  component: ProductOverview,
  tags: ['autodocs'],
  parameters: {
    deepControls: { enabled: false }
  },
  render: (args: ProductItemProps) => ({
    components: { ProductOverview },
    created: () => {
      const basketStore = useBasketStore()

      basketStore.basket = { ...productOverviewStaticProps }
    },
    setup: () => {
      return { args }
    },
    template: `
    <product-overview
      :fields="args.fields"
      :rendering="args.rendering"
    />
    `
  })
}
export default meta

type Story = StoryObj<typeof ProductOverview>

export const ProductOverviewBasket: Story = {
  args: {
    fields: {
      ShowHeaders: false
    },
    rendering: {
      componentName: 'ProductOverview'
    }
  }
}
