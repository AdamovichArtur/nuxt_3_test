<template>
  <div
    :class="{
      'sm:flex sm:gap-3 w-full h-full test-vertical-class':
        !isHorizontalThumbnails,
    }"
    data-test-id="image-gallery-wrapper"
    @mouseenter="setHoverCarouselState(true)"
    @mouseleave="setHoverCarouselState(false)"
    @click="handleOuterClick"
  >
    <image-gallery-content
      :class="{
        'sm:w-10/12 w-full test-vertical-class': !isHorizontalThumbnails,
        'w-full test-horizontal-class': isHorizontalThumbnails,
      }"
      :direction="swiperDirection"
      :is-carousel-hovered="isCarouselHovered"
      :show-slider-navigation="showSliderNavigation"
      :modules="modules"
      :items="sliderItems"
      :thumbs-swiper="{ swiper: thumbsSwiper }"
      :autoplay-options="autoplayOptions"
      :is-auto-slide-active="isAutoSlideActive"
      :swiper-ref="mainSwiper"
      data-test-id="image-gallery-content-test-id"
      @set-main-swiper="setMainSwiper"
      @show-or-hide-full-screen="showOrHideFullScreen"
    />

    <image-gallery-pagination
      v-if="showSliderNavigation"
      class="mt-5"
      :class="{
        'sm:m-0 sm:w-2/12 w-full sm:-order-1 test-vertical-class':
          !isHorizontalThumbnails,
      }"
      :items="sliderItems"
      :modules="modules"
      :direction="swiperDirection"
      data-test-id="image-gallery-pagination-test-id"
      @set-thumbs-swiper="setThumbsSwiper"
    />

    <image-gallery-overlay
      :image="selectedImage?.Image"
      :show-full-mode="isFullImageMode"
      @click-outside="showOrHideFullScreen"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ImageGalleryProps, ImageCarouselItem } from "./ImageGallery.d";
import { AutoplayOptions } from "swiper/types";

import useBreakpoints from "@/utils/composables/viewport/useBreakpoints";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageGalleryOverlay from "./components/ImageGalleryOverlay/ImageGalleryOverlay.vue";
import ImageGalleryPagination from "./components/ImageGalleryPagination/ImageGalleryPagination.vue";
import ImageGalleryContent from "./components/ImageGalleryContent/ImageGalleryContent.vue";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const props = withDefaults(defineProps<ImageGalleryProps>(), {
  fields: () => ({
    items: [] as Array<ImageCarouselItem>,
    Autoslide: { value: true },
    HorizontalThumbnails: { value: true },
    SliderDuration: { value: 5000 },
  }),
});

const { isMobile } = useBreakpoints();

const modules = [FreeMode, Navigation, Thumbs, Autoplay];

const isFullImageMode = ref(false);
const isCarouselHovered = ref(false);
const mainSwiper = ref(null);
const thumbsSwiper = ref(null);
const selectedImageIndex = ref(null);
const isAutoSlideActive = get(props, "fields.Autoslide.value", true);
const sliderDuration = get(props, "fields.SliderDuration.value", 5000);

const sliderItems = computed<Array<ImageCarouselItem>>(() =>
  get(props, "fields.items", [])
);

const autoplayOptions = computed<AutoplayOptions | undefined>(() => {
  /* From sitecore we get the primitive number such as: 1, 2, 3, 4, 5 etc */
  const secondsDelay = sliderDuration * 1000;

  if (!isAutoSlideActive) return undefined;

  return {
    delay: secondsDelay,
    pauseOnMouseEnter: true,
  };
});

const selectedImage = computed(
  () => sliderItems.value[selectedImageIndex.value]
);

const isHorizontalThumbnails = computed(() =>
  get(props, "fields.HorizontalThumbnails.value", true)
);

const swiperDirection = computed(() =>
  isHorizontalThumbnails.value ? "horizontal" : "vertical"
);

const showSliderNavigation = computed(() => sliderItems.value.length > 1);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

const showOrHideFullScreen = (index = null) => {
  if (isMobile.value) return;

  isFullImageMode.value = !isFullImageMode.value;

  if (!isFullImageMode.value) {
    selectedImageIndex.value = null;
    isAutoSlideActive && mainSwiper.value.autoplay.start();
  } else {
    selectedImageIndex.value = index;
    mainSwiper.value.autoplay.stop();
  }
};

const setHoverCarouselState = (state = false) => {
  isCarouselHovered.value = state;
};

const handleOuterClick = () => {
  if (isFullImageMode.value) {
    showOrHideFullScreen();
  }
};
</script>
