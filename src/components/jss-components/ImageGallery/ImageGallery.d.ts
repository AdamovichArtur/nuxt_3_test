import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'

export type ImageGalleryProps = {
  readonly fields: {
    items: Array<ImageCarouselItem>
    Autoslide: {
      value: boolean
    }
    HorizontalThumbnails: {
      value: boolean
    }
    SliderDuration: {
      value: number
    }
  }
}

export type ImageCarouselItem = {
  readonly Image?: ImageField
  readonly Video?: {
    value: ''
  }
  readonly VideoThumbnail?: ImageField
}
