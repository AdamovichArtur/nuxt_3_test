<template>
  <div>
    <swiper
      class="imageCarousel"
      :class="`imageCarousel--${direction}`"
      lazy
      :style="{ '--swiper-navigation-color': '#707070', '--swiper-pagination-color': '#707070' }"
      :space-between="10"
      :autoplay="autoplayOptions"
      :navigation="isCarouselHovered && showSliderNavigation"
      :modules="modules"
      :thumbs="thumbsSwiper"
      data-test-id="swiper-component-test-id"
      @swiper="setMainSwiper"
      @slide-change="slideChanged"
    >
      <swiper-slide
        v-for="(item, index) in items"
        v-slot="{ isActive }"
        :key="`slide-${index}`"
        :class="{ 'relative flex items-stretch h-auto thumbnail-test-class': item?.VideoThumbnail }"
        data-test-id="swiper-slide-component-test-id"
      >
        <sc-image
          class="opacity-100 w-full object-contain"
          :class="{
            'cursor-pointer image-test-class': !item?.Video,
            'opacity-0 image-inactive-test-class': isActiveVideo
          }"
          :is-lazy-load="false"
          aspect-ratio="1:1"
          :media="item?.Image || item?.VideoThumbnail"
          data-test-id="image-component-test-id"
          @click.stop="item?.Image && showOrHideFullScreen(index)"
        />
        <button
          v-if="item?.VideoThumbnail"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer h-14 w-24 bg-velux-light-grey hover:bg-velux-light-grey transition-colors rounded-sm"
          data-test-id="button-play-video-test-id"
          @click.stop="playVideo(index)"
        >
          <base-icon
            name="play-button"
            class="sm:w-7 sm:h-7 w-5 h-5 m-auto text-velux-white"
          />
        </button>
        <div
          v-if="item?.Video && isActiveVideo && isActive && activeVideoIndex !== -1"
          :key="`video-${index}`"
          class="absolute h-full w-full opacity-100 z-10"
          data-test-id="video-wrapper-test-id"
        >
          <iframe
            class="top-0 left-0 w-full h-full"
            :src="item?.Video.value + '&hideBigPlay=1&autoPlay=1&autoMute=0'"
            allow="autoplay"
            allowfullscreen="true"
            loading="lazy"
            frameborder="0"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageGalleryContentProps } from './ImageGalleryContent.d'
import { Swiper as SwiperType } from 'swiper/types'

import { Swiper, SwiperSlide } from 'swiper/vue'
import ScImage from '@/components/sitecore-components/image/ScImage.vue'
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'

const props = withDefaults(defineProps<ImageGalleryContentProps>(), {
  isCarouselHovered: undefined,
  showSliderNavigation: undefined,
  modules: () => [],
  items: () => [],
  thumbsSwiper: undefined,
  autoplayOptions: undefined,
  isAutoSlideActive: true,
  swiperRef: null,
  direction: 'horizontal'
})

const emit = defineEmits<{
  setMainSwiper: [SwiperType]
  showOrHideFullScreen: [number]
}>()

const isActiveVideo = ref(false)
const activeVideoIndex = ref(-1)

const setMainSwiper = (swiper: SwiperType) => {
  emit('setMainSwiper', swiper)
}

const showOrHideFullScreen = (index: number) => {
  emit('showOrHideFullScreen', index)
}

const slideChanged = () => {
  if (activeVideoIndex.value !== -1) {
    isActiveVideo.value = false
    activeVideoIndex.value = -1
    props.isAutoSlideActive && props.swiperRef?.autoplay?.start()
  }
}

const playVideo = (index: number) => {
  isActiveVideo.value = true
  activeVideoIndex.value = index
  props.swiperRef?.autoplay?.stop()
}
</script>

<style lang="scss" scoped>
:deep(.imageCarousel) {
  display: grid;

  .swiper-wrapper {
    min-width: 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    font-weight: bold;
  }
  .swiper-button-disabled {
    @apply opacity-0;
  }
}
</style>
