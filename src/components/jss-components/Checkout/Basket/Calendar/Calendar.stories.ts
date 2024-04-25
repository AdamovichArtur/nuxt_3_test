import { vueRouter } from 'storybook-vue3-router'
import type { Meta, StoryObj } from '@storybook/vue3'

import Calendar from './Calendar.vue'
import { CircleColor, CalendarProps } from './Calendar.d'

const meta: Meta<typeof Calendar> = {
  title: 'Jss components / ExpectedDelivery / Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    deepControls: { enabled: true }
  },
  decorators: [vueRouter()],
  render: (args: CalendarProps) => ({
    components: { Calendar },
    setup() {
      return { args }
    },
    template: `
    <Calendar
      style="height: 400px"
      v-bind="args"
    />
    `
  }),
  argTypes: {
    'fields.circleColor': {
      description: 'colors for selected date ',
      options: Object.keys(CircleColor),
      mapping: CircleColor,
      control: {
        type: 'select',
        labels: {
          [CircleColor.Blue]: 'blue',
          [CircleColor.Green]: 'green',
          [CircleColor.Red]: 'red'
        }
      }
    },
    'fields.availableWeeks': {
      description: 'numbers - available weeks count',
      control: 'number'
    },
    'fields.disabledDays': {
      description: 'numbers[] - 0-6, 0 is Sunday, 6 is Saturday',
      default: [0, 6],
      control: 'object'
    },
    'fields.disabledDates': {
      description: 'Date[] - format YYYY-MM-DD',
      default: ['13.03.2024'],
      control: 'object'
    }
  }
}
export default meta

type Story = StoryObj<typeof Calendar>

export const DefaultCalendar: Story = {
  args: {
    fields: {
      circleColor: CircleColor.Blue,
      availableWeeks: 2,
      disabledDays: [0, 6],
      disabledDates: ['2024-03-13']
    }
  }
}
