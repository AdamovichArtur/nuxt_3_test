import type { Meta, StoryObj } from '@storybook/vue3'

import Product from './Product.vue'
import { ProductCardFieldsProps } from './Product.d'
import { productStaticProps } from './mock/mock'

const meta: Meta<typeof Product> = {
  title: 'Jss components / Product / Product right component',
  component: Product,
  tags: ['autodocs'],

  render: (args: ProductCardFieldsProps) => ({
    components: { Product },
    created: () => {},
    setup: () => {
      return { args }
    },
    template: `
    <product
      v-bind="args"
    />
    `
  })
}
export default meta

type Story = StoryObj<typeof Product>

export const ProductPage: Story = {
  args: productStaticProps
}
