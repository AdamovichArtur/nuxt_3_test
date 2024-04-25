<template>
  <sc-rich-text
    class="p-4 mt-4"
    :class="classList"
    :field="field"
    tag="div"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ScRichText from '@/components/sitecore-components/rich-text/ScRichText.vue'

import { DescriptionProps } from './Description.d'

const props = withDefaults(defineProps<DescriptionProps>(), {
  field: () => ({ value: '' }),
  hasBackground: true,
  backgroundClasses: 'bg-velux-background-grey'
})

const classList = computed(() => (props.hasBackground ? props.backgroundClasses : ''))
</script>
