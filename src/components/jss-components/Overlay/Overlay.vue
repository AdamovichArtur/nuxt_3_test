<template>
  <div
    v-if="overlayFunctions?.length"
    class="overlay"
    @click="overlayClick"
  />
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/GlobalStore'

let globalStore = useGlobalStore()

let overlayClick = () => {
  globalStore?.overlayClickHandler()
}

let overlayFunctions = globalStore?.overlayFunctions
</script>

<style scoped lang="scss">
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: none !important;
  cursor: pointer;
  z-index: 1;

  &:deep() {
    ~ .m-mainContent,
    ~ .footerComponent,
    ~ .headerComponent > div > div > div:not(.headerOffCanvas) {
      filter: blur(0.2rem);
    }
  }
}
</style>
