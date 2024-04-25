export enum CircleColor {
  Blue = '#5E8ED6',
  Red = '#C70000',
  Green = '#3adb76'
}

export type CalendarProps = {
  readonly fields?: {
    availableWeeks?: Number
    circleColor?: CircleColor
    disabledDays?: Array<number>
    disabledDates?: Array<Date>
  }
}
