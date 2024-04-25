export type BaseInputProps = {
  readonly name?: string
  readonly type?: string
  readonly label?: string
  readonly usePlaceholder?: boolean
  readonly required?: boolean
  readonly pattern?: string
  readonly validLabel?: string
  readonly invalidLabel?: string
  readonly disabled?: boolean
  readonly validationMarkerType?: string

  isValid?: boolean | null
  userInput?: string | null
}
