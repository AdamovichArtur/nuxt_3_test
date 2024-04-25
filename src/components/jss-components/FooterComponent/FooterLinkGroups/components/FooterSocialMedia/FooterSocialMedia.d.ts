import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'
import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'

export type FooterSocialMediaProps = {
  socialMediaItems: Array<SocialMediaItem>
}

type SocialMediaItem = {
  id: string
  fields: {
    Link: LinkField
    Image: ImageField
  }
}
