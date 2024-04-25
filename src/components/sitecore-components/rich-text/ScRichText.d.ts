import { Field } from '@sitecore-jss/sitecore-jss-vue'

export type ScRichTextProps = {
  readonly field?: Field & {
    value?: string
  }
  readonly tag?: string
}
