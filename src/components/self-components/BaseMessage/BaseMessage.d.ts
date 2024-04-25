export enum MessageType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}

export type BaseMessageProps = {
  readonly type: MessageType
  readonly messageText: string
  readonly messageIcon?: string
}
