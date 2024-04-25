<template>
  <sc-text
    :tag="tag"
    :field="field"
    :class="$attrs.class"
  />
</template>

<script setup lang="ts">
import { Text as ScText } from '@sitecore-jss/sitecore-jss-vue'
import { ScTextProps } from './ScText.d'

withDefaults(defineProps<ScTextProps>(), {
  tag: 'span',
  field: () => ({ value: '' })
})
</script>
