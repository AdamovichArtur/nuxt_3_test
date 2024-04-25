<template>
  <div
    class="tabContent"
    :class="{ active: isActive }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    required: true,
    default: () => {}
  }
})
</script>

<style scoped lang="scss">
.tabContent {
  display: none;

  &.active {
    display: block;
  }
}
</style>
