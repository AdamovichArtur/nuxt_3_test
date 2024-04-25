import { Field } from '@sitecore-jss/sitecore-jss-vue'

export type ScTextProps = {
  readonly field?: Field & {
    value?: string | number
  }
  readonly tag?: string
}
