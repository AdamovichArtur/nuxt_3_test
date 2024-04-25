import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'
import { ThumbsOptions, NavigationOptions, AutoplayOptions, Swiper } from 'swiper/types'

export type ImageGalleryContentProps = {
  readonly isCarouselHovered: boolean
  readonly showSliderNavigation: NavigationOptions | boolean
  readonly modules: Array<any>
  readonly items: Array<ContentItem>
  readonly thumbsSwiper: ThumbsOptions
  readonly autoplayOptions?: AutoplayOptions
  readonly isAutoSlideActive?: boolean
  readonly swiperRef: Swiper | null
  readonly direction: 'horizontal' | 'vertical'
}

type ContentItem = {
  readonly Image?: ImageField
  readonly Video?: {
    value: ''
  }
  readonly VideoThumbnail?: ImageField
}
