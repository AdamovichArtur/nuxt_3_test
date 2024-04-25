import type { Meta, StoryObj } from '@storybook/vue3'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'

import ExpectedDelivery from './ExpectedDelivery.vue'
import calendar, {
  DefaultCalendar
} from '@/components/jss-components/Checkout/Basket/Calendar/Calendar.stories'

const meta: Meta<typeof ExpectedDelivery> = {
  title: 'Jss components / ExpectedDelivery',
  component: ExpectedDelivery,
  tags: ['autodocs'],
  render: () => ({
    components: { ExpectedDelivery },
    created: () => {
      const basketStore = useBasketStore()

      basketStore.basket = {
        ...basketStore.basket,
        expectedDeliveryTime: 'Expected delivery time 11 - 12 days'
      }
    },
    template: `<expected-delivery/>`
  })
}
export default meta

type Story = StoryObj<typeof ExpectedDelivery>

export const ExpectedDeliveryBasket: Story = {}

export const ExpectedDeliveryBasketWithCalendar: Story = {
  render: (args) => ({
    components: { ExpectedDelivery, DefaultCalendar: calendar.component },
    created: () => {
      const basketStore = useBasketStore()

      basketStore.basket = {
        ...basketStore.basket,
        expectedDeliveryTime: `Expected delivery time 11 - 12 days <br><br>   
        Delivery Date - does this date suit you?<br>
        Your order should be delivered on the date stated below. Should this date not be suitable, please select an alternative date.`
      }
    },
    setup() {
      //👇 The args will now be passed down to the template
      return { args }
    },
    template: '<expected-delivery v-bind="args"/> <default-calendar v-bind="args"/>'
  }),
  args: {
    ...DefaultCalendar.args
  }
}
