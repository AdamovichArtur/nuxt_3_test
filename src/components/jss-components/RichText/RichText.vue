<template>
  <sc-rich-text
    class="richText"
    :field="fields.RichText"
  />
</template>

<script setup lang="ts">
import { RichTextProps } from './RichText.d'
import ScRichText from '@/components/sitecore-components/rich-text/ScRichText.vue'

withDefaults(defineProps<RichTextProps>(), {
  fields: () => ({
    RichText: { value: '' }
  })
})
</script>

<style lang="scss">
// TODO: remove once prose is configured with VELUX styles
.richText {
  ul {
    @apply list-square;
  }

  ol {
    @apply list-decimal;
  }
}
</style>
