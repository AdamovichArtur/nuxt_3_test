<template>
  <sc-rich-text
    :tag="tag"
    :field="field"
  />
</template>

<script setup lang="ts">
import { RichText as ScRichText } from '@sitecore-jss/sitecore-jss-vue'
import { ScRichTextProps } from './ScRichText.d'

withDefaults(defineProps<ScRichTextProps>(), {
  tag: 'div',
  field: () => ({ value: '' })
})
</script>
