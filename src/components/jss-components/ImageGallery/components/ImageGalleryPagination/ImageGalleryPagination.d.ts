import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'

export type ImageGalleryPaginationProps = {
  readonly modules: Array<any>
  readonly items: Array<ItemProps>
  readonly direction: DirectionProps
}

export type DirectionProps = 'horizontal' | 'vertical'

export type ItemProps = {
  readonly Image?: ImageField
  readonly Video?: {
    value: ''
  }
  readonly VideoThumbnail?: ImageField
}
