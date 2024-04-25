<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showFullMode"
      class="fixed top-0 left-0 w-full h-full bg-velux-grey bg-opacity-80 flex items-center justify-center z-50 transition-opacity"
      data-test-id="overlay-wrapper-test-id"
    >
      <sc-image
        class="absolute max-w-[50vw] w-full h-full"
        icon-contain
        aspect-ratio="1:1"
        :media="image"
        @click.stop
      />

      <span
        class="absolute top-3 right-5 text-32 text-velux-white cursor-pointer"
        data-test-id="overlay-span-test-id"
        @click="showOrHideFullScreen"
      >
        &times;
      </span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ImageGalleryOverlayProps } from './ImageGalleryOverlay.d'

import ScImage from '@/components/sitecore-components/image/ScImage.vue'

withDefaults(defineProps<ImageGalleryOverlayProps>(), {
  showFullMode: false,
  image: () => ({
    value: {
      src: ''
    }
  })
})

const emit = defineEmits<{
  clickOutside
}>()

const showOrHideFullScreen = () => {
  emit('clickOutside')
}
</script>
