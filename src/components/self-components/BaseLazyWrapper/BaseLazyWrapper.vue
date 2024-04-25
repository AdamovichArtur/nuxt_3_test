<template>
  <div ref="wrapper">
    <transition-group v-if="!disabled">
      <slot v-if="isVisibleContent" />
    </transition-group>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import useObserverProcessing from './composables/useObserverProcessing'

import { BaseLazyWrapperProps } from './BaseLazyWrapper.d'

const props = withDefaults(defineProps<BaseLazyWrapperProps>(), {
  intersectionOffset: 100,
  disabled: false
})

const emit = defineEmits(['mountedContent'])

const { wrapper, isVisibleContent } = useObserverProcessing(props.intersectionOffset)

watch(isVisibleContent, (value) => {
  if (!value) return

  emit('mountedContent')
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
