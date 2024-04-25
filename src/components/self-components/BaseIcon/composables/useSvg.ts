import { computed } from 'vue'
import { useSvgProps } from './useSvg.d'

export default function (props: useSvgProps) {
  const { svgSize, svgName, sprite } = props

  const svgFullSize = computed<string>(() => `w-${svgSize} h-${svgSize}`)

  const svg = computed<string>(() => `${sprite}#${svgName}`)

  return { svgFullSize, svg }
}
