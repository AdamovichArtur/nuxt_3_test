import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'
import { ImageField } from '@sitecore-jss/sitecore-jss-vue/types/components/Image'

export type FooterLinkGroupsProps = {
  fields: {
    readonly LinkGroups: Array<LinkGroupItem>
    readonly Layout: {
      value: string
    }
  }
}

export type ExternalScriptAndSocialMediaProps = {
  readonly socialMedia: {
    items: Array<SocialMediaItem>
    header: {
      value: string
    }
  }
  readonly externalScript: {
    script: string
  }
}

type LinkGroupItem = {
  readonly id: string
  readonly expanded: boolean
  readonly fields: {
    Header: {
      value: string
    }
    HideHeaderForSmallScreens: {
      value: boolean
    }
    Items: Array<LinkItem>
  }
}

type LinkItem = {
  readonly id: string
  readonly fields: {
    Header?: {
      value: string
    }
    Label?: {
      value: string
    }
    Link?: LinkField & {
      modal: boolean
      linktype: string
    }
    ImageLinks?: Array<SocialMediaItem>
    Script?: {
      value: string
    }
  }
}

type SocialMediaItem = {
  id: string
  fields: {
    Link: LinkField
    Image: ImageField
  }
}
