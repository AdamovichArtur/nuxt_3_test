export type BaseButtonProps = {
  readonly linkUrl?: string // Url if this is an a tag
  readonly element?: string
  readonly label?: string
  readonly chevron?: boolean
  readonly betweenContent?: boolean
  readonly chevronDirection?: string // (up, right, down, left)
  readonly chevronPosition?: string // (left, right)
  readonly styleImportance?: string // (primary, secondary, tertiary)
  readonly size?: string // (small, medium, large)
  readonly disabled?: boolean
  readonly buttonType?: string // (button, reset, submit)
  readonly fullWidth?: boolean
  readonly textOnly?: boolean
  readonly isBottomIndent?: boolean // margin-bottom 1.5rem
  readonly isPadding?: boolean // margin-bottom 1.5rem
}
