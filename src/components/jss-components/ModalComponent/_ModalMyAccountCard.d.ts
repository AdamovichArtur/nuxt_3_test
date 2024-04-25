import { Field } from '@sitecore-jss/sitecore-jss-vue'
import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'

export type ModalMyAccountCardProps = {
  readonly fields: ModalMyAccountCardFields
}

type ModalMyAccountCardFields = {
  readonly ForgotPasswordLink: LinkField
  readonly RememberDeviceLabel: Field<string>
  readonly SignUpTitle: Field<string>
  readonly SignUpLink: LinkField
  readonly PasswordLabel: Field<string>
  readonly SignUpText: Field<string>
  readonly EmailLabel: Field<string>
  readonly SignInLabel: Field<string>
}
