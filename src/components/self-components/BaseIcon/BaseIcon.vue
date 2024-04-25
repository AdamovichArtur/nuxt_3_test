<template>
  <svg :class="svgFullSize">
    <use :xlink:href="svg" />
  </svg>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { SvgIconProps } from './BaseIcon.d'

import useSvg from './composables/useSvg'
import iconSprite from '@/assets/svg-sprites/icon-sprite.svg?url'

/*
  Safelist for TailwindCSS for most common icon sizes
    Width: w-6 w-7 w-8 w-9 w-10 w-11 w-12
    Height: h-6 h-7 h-8 h-9 h-10 h-11 h-12
*/

const props = withDefaults(defineProps<SvgIconProps>(), {
  name: 'placeholder',
  size: 48
})

const { name, size } = toRefs(props)

const { svg, svgFullSize } = useSvg({
  svgName: name.value,
  svgSize: size.value,
  sprite: iconSprite
})
</script>
