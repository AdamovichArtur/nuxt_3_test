import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-vue'
import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'

type AddressInformationProps = {
  fields: {
    BillingHeadline: Field<string>
    DeliveryHeadline: Field<string>
    DifferentDeliveryAddress: Field<string>
    ChangeAddressLinkText: Field<string>
    ButtonGotoPayment: LinkField
    ErrorMessage: Field<string>
    HouseNumber: Field<string>
    PostalCode: Field<string>
    AddressLinkText: Field<string>
    SelectYourAddress: Field<string>
    CannotFindAddressOption: Field<string>
    ProceedButtonLink: LinkField
    BillingFields: Array<AddressField> | []
    DeliveryFields: Array<AddressField> | []
  }
  rendering: ComponentRendering
}

type AddressField = {
  Name: string
  Type: string
  KeyboardLayout: string
  WaitPostCode: boolean
  Label: string
  OptionalLabel: string
  InfoMessage: string
  Mandatory: boolean
  MandatoryLabel: string
  ErrorMandatory: string
  RegularExpression: string
  ErrorRegularExpression: string
}

type TextField = Field<string>

export { AddressInformationProps, TextField, AddressField }
