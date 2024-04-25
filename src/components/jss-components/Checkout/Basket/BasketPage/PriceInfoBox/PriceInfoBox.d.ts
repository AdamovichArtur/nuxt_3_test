import { Field } from '@sitecore-jss/sitecore-jss-vue'
import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'

type PriceInfoBoxFieldsProps = {
  readonly DeliveryFeeText: Field<string>
  readonly PriceOverviewHeaderText: Field<string>
  readonly ProceedButtonLink: LinkField
  readonly SubTotalText: Field<string>
  readonly TotalCampaignDiscountText: Field<string>
  readonly VatText: Field<string>
  readonly YouSaveText: Field<string>
  readonly SendEnquiryLink: LinkField
}

type PriceInfoBoxActionsProps = {
  readonly showSendEnquiryButton: boolean
  readonly showProceedButton: boolean
  readonly isContentCentered?: boolean
  readonly sendEnquiryLink: string
  readonly sendEnquiryLinkText: string
  readonly proceedButtonLinkText: string
  readonly proceedButtonLink: string
}

type PriceInfoBoxTotalProps = {
  readonly totalSum?: number
}

type PriceInfoBoxProps = {
  fields: PriceInfoBoxFieldsProps
}
type TextField = Field<string>

export { PriceInfoBoxProps, TextField, PriceInfoBoxActionsProps, PriceInfoBoxTotalProps }
