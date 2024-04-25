import { ComponentFields, Field } from '@sitecore-jss/sitecore-jss-vue'

export type RichTextProps = {
  readonly fields?: ComponentFields & {
    RichText?: Field<string>
  }
}
