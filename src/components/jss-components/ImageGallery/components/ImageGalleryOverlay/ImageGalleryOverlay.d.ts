import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'

export type ImageGalleryOverlayProps = {
  readonly image: ImageField<string>
  readonly showFullMode: boolean
}
