<template>
  <div>
    <swiper
      lazy
      free-mode
      watch-slides-progress
      space-between="5"
      :class="`paginationCarousel h-full`"
      :slides-per-view="slidesPerView"
      :auto-height="isVerticalDirection"
      :modules="modules"
      :direction="paginationDirection"
      data-test-id="swiper-component-test-id"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="index"
        class="cursor-pointer transition-opacity opacity-40 hover:opacity-100"
        :class="{
          '!h-auto': isVerticalDirection
        }"
      >
        <sc-image
          class="cursor-pointer"
          aspect-ratio="1:1"
          data-test-id="swiper-slide-item"
          :media="item?.Image || item?.VideoThumbnail"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Swiper as SwiperType } from 'swiper/types'
import { ImageGalleryPaginationProps, DirectionProps } from './ImageGalleryPagination.d'

import useBreakpoints from '@/utils/composables/viewport/useBreakpoints'

import ScImage from '@/components/sitecore-components/image/ScImage.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

const props = withDefaults(defineProps<ImageGalleryPaginationProps>(), {
  modules: () => [],
  items: () => [],
  direction: 'horizontal'
})

const emit = defineEmits<{
  setThumbsSwiper: [SwiperType]
}>()

const maxSlidePerView = 5
const { isMobile } = useBreakpoints()

const slidesPerView = computed<number | 'auto'>(() => {
  if (isVerticalDirection.value) {
    return 'auto'
  }

  return maxSlidePerView
})

const paginationDirection = computed<DirectionProps>(() =>
  isMobile.value ? 'horizontal' : props.direction
)

const isVerticalDirection = computed<boolean>(() => paginationDirection.value === 'vertical')

const setThumbsSwiper = (swiper: SwiperType) => {
  emit('setThumbsSwiper', swiper)
}
</script>

<style lang="scss" scoped>
:deep(.paginationCarousel) {
  display: grid;

  > .swiper-wrapper {
    min-width: 0;

    @media (max-width: 768px) {
      height: 100% !important;
    }
    .swiper-slide-thumb-active {
      opacity: 1;
    }
  }
}
</style>
