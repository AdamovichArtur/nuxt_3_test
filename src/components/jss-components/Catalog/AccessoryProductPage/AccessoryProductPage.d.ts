import { ComponentRendering } from '@sitecore-jss/sitecore-jss-vue'
import { Field } from '@sitecore-jss/sitecore-jss-vue'

export type AccessoryProductPageProps = {
  fields: {
    PageTitle: Field<string>
  }
  rendering: ComponentRendering
}
