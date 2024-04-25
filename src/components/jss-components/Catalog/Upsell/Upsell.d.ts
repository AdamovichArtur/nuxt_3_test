import { Field } from '@sitecore-jss/sitecore-jss-vue'

export type UpsellProps = {
  fields: {
    ComponentHeader: Field<string>
    MaxNumberOfRelatedProducts: Field<number>
    PicassoRelationType: Field<string>
  }
}
