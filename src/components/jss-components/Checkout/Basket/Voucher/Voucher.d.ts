import { Field } from '@sitecore-jss/sitecore-jss-vue'

export type VoucherProps = {
  readonly fields: VoucherFields
}

type VoucherFields = {
  readonly VoucherHeader: Field<string>
  readonly VoucherPlaceholder: Field<string>
  readonly VoucherSubmitButtonText: Field<string>
  readonly VoucherDeleteButtonText: Field<string>
  readonly VoucherSettings: VoucherSettings
}

type VoucherSettings = {
  readonly EnableVoucherForm: Field<boolean>
  readonly VoucherMessageError: Field<string>
}
