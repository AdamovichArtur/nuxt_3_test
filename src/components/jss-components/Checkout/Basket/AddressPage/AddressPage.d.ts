import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-vue'
import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'

export type AddressPageProps = {
  fields: {
    PageTitle: Field<string>
    BackLink: LinkField
  }
  rendering: ComponentRendering
}
