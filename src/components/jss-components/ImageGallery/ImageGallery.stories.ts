import type { Meta, StoryObj } from '@storybook/vue3'

import ImageGallery from './ImageGallery.vue'
import { ImageGalleryProps } from './ImageGallery.d'
import { imageGalleryPropsData } from './mock/mock.js'

const meta: Meta<typeof ImageGallery> = {
  title: 'Jss components / ImageGallery',
  component: ImageGallery,
  tags: ['autodocs'],
  parameters: {
    deepControls: { enabled: false }
  },
  render: (args: ImageGalleryProps) => ({
    components: { ImageGallery },
    created: () => {},
    setup: () => {
      return { args }
    },
    template: `
    <image-gallery
        :fields="args" 
      />
    `
  })
}
export default meta

type Story = StoryObj<typeof ImageGallery>

export const ImageGalleryComponentHorizontally: Story = {
  args: imageGalleryPropsData
}

export const ImageGalleryComponentVetrically: Story = {
  args: {
    ...imageGalleryPropsData,
    HorizontalThumbnails: {
      value: false
    }
  }
}
