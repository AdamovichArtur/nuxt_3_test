import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'

export type ScImageProps = {
  readonly media: ImageField
  readonly aspectRatio?: AspectRatioProps
  readonly height?: number
  readonly width?: number
  readonly isLazyLoad?: boolean
  readonly autoHeight?: boolean
  readonly iconContain?: boolean
}

export type AspectRatioProps = '1:1' | '3:4' | '4:3' | '9:16' | '16:9' | '120:43' | ''
