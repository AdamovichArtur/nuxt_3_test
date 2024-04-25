<template>
  <div class="gridComponent grid-x grid-padding-x grid-padding-y cell">
    <div
      v-for="(gridCell, index) in props?.fields?.Presentation?.value"
      :key="index"
      class="gridCell cell"
      :class="getScreenSizeClasses(gridCell)"
    >
      <placeholder
        :name="'grid-' + index"
        :rendering="props.rendering"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentRendering, Placeholder } from '@sitecore-jss/sitecore-jss-vue'
const props = defineProps({
  fields: {
    type: Object,
    required: true,
    default: () => {}
  },
  rendering: {
    type: Object as () => ComponentRendering,
    required: true,
    default: () => {}
  }
})

function getScreenSizeClasses(cell) {
  let classes: string = ''

  if (cell) {
    classes += 'small-' + cell.small + ' medium-' + cell.medium + ' large-' + cell.large
  }

  return classes
}
</script>
