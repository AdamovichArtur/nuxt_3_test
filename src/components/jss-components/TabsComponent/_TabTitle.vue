<template>
  <sc-text
    class="tabTitle"
    :class="{ active: isActive }"
    tag="li"
    :field="title"
  />
</template>

<script setup lang="ts">
import { Text as ScText } from '@sitecore-jss/sitecore-jss-vue'

defineProps({
  title: {
    type: Object,
    required: true,
    default: () => {}
  },
  isActive: {
    type: Boolean,
    required: true,
    default: () => {}
  }
})
</script>

<style scoped lang="scss">
.tabTitle {
  color: get-color-var('black');
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &.active {
    color: get-color-var('primary');
    border-bottom: get-var('borderThin') solid get-color-var('primary');
  }
}
</style>
