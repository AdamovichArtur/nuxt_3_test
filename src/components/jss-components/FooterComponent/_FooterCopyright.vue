<template>
  <div class="footerCopyright text-center medium-text-left">
    <sc-text :field="footerData?.CopyrightText" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Text as ScText } from '@sitecore-jss/sitecore-jss-vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const footerData = reactive(props.fields)
</script>

<style scoped lang="scss">
@import 'foundation-sites/scss/foundation';

.footerCopyright {
  color: get-color-var('gray', 'light');
  text-align: center;
  padding: 0 1rem 1rem;

  @include breakpoint(medium) {
    text-align: left;
  }
}
</style>
