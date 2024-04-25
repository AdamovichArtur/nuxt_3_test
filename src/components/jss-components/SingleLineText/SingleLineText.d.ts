import { ComponentFields, Field } from '@sitecore-jss/sitecore-jss-vue'

export type SingleLineTextProps = {
  readonly fields?: ComponentFields & {
    LabelText?: Field<string, number>
    TextType?: Field<string>
    TextAlign?: Field<string>
    FontWeight?: Field<string>
  }
}
