import { Field } from '@sitecore-jss/sitecore-jss-vue'

export type VoucherControlsProps = {
  readonly placeholderText: string
  readonly buttonText: Field<string>
  readonly deleteButtonText: Field<string>
  readonly notificationMessage: Field<string>
  readonly voucherCode?: string
  readonly voucherStatus: VoucherStatuses
}

export enum VoucherStatuses {
  NotExist = 'NotExist',
  NoProducts = 'NoProducts',
  Invalid = 'Invalid',
  Valid = 'Valid'
}
