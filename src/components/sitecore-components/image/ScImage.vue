<template>
  <lazy-wrapper
    v-if="isLazyLoad"
    :class="[{ relative: hasAspectRatio }, aspectRatioClassList]"
  >
    <sc-image
      class="w-full"
      loading="lazy"
      :onerror="onImageError"
      :class="imageClasses"
      :media="mediaData"
    />
  </lazy-wrapper>
  <div v-else :class="[{ relative: hasAspectRatio }, aspectRatioClassList]">
    <sc-image
      :media="mediaData"
      :class="imageClasses"
      :onerror="onImageError"
    />
  </div>
</template>

<script setup lang="ts">
import useBreakpoints from "@/utils/composables/viewport/useBreakpoints";
import breakpointsConstants from "@/constants/breakpointsConstants";

import { computed } from "vue";

import LazyWrapper from "@/components/self-components/BaseLazyWrapper/BaseLazyWrapper.vue";
import { Image as scImage, constants } from "@sitecore-jss/sitecore-jss-vue";

import defaultImage from "@/assets/images/default.png";
import { ScImageProps, AspectRatioProps } from "./ScImage.d";
import { ImageField } from "@sitecore-jss/sitecore-jss-vue/types/components/Image.d";

const { isVeryLargeDesktop, isLargestDesktop, isLargeDesktop } =
  useBreakpoints();
const { LG_SIZE, XL_SIZE, XXL_SIZE } = breakpointsConstants;

const props = withDefaults(defineProps<ScImageProps>(), {
  aspectRatio: "",
  isLazyLoad: true,
  autoHeight: false,
});

const aspectRatioClassList = computed<AspectRatioProps>(() => {
  const aspectRatio = get(props, "aspectRatio");
  const aspectRatioConfig = {
    "1:1": "aspect-w-1 aspect-h-1",
    "3:4": "aspect-w-3 aspect-h-4",
    "4:3": "aspect-w-4 aspect-h-3",
    "9:16": "aspect-w-9 aspect-h-16",
    "16:9": "aspect-w-16 aspect-h-9",
    "120:43": "aspect-w-120 aspect-h-43",
  };

  if (!aspectRatioConfig[aspectRatio]) return "";

  return aspectRatioConfig[aspectRatio];
});

const hasAspectRatio = computed<boolean>(
  () => !!aspectRatioClassList.value.length
);

const manageImageSize = (propsValue: number): number => {
  let scale;

  switch (true) {
    case isLargestDesktop.value: {
      scale = XXL_SIZE / LG_SIZE;
      break;
    }
    case isVeryLargeDesktop.value || isLargeDesktop.value: {
      scale = XL_SIZE / LG_SIZE;
      break;
    }
    default: {
      scale = 1;
    }
  }

  return Math.round(propsValue * scale);
};

const mediaParams = computed<string>(() => {
  let mediaParamsString = "";
  const mediaSrc = get(props, "media.value.src") || "";
  const isParams = mediaSrc.includes("?");

  if (props.height) {
    const imageHeight = manageImageSize(props.height);
    mediaParamsString += `${
      isParams || mediaParamsString ? "&" : "?"
    }ch=${imageHeight}`;
  }

  if (props.width) {
    const imageWidth = manageImageSize(props.width);
    mediaParamsString += `${
      isParams || mediaParamsString ? "&" : "?"
    }cw=${imageWidth}`;
  }

  return mediaParamsString;
});

const mediaData = computed<ImageField>(() => {
  const clonedMedia = cloneDeep(props.media);

  const src = get(clonedMedia, "value.src") || "";

  if (!src.length) {
    return clonedMedia;
  }

  const disconnected =
    import.meta.env.VITE_JSS_MODE === constants.JSS_MODE.DISCONNECTED;
  /*
     Solution only for local development
  */
  if (disconnected) {
    if (src?.startsWith("http")) {
      set(clonedMedia, "value.src", `${src}${mediaParams.value}`);
    } else {
      set(
        clonedMedia,
        "value.src",
        `${import.meta.env.VITE_SITECORE_API_HOST}${src}${mediaParams.value}`
      );
    }

    return clonedMedia;
  }

  set(clonedMedia, "value.src", `${src}${mediaParams.value}`);

  return clonedMedia;
});

const imageClasses = computed<Array<string | object>>(() => {
  return [
    {
      "h-full": !props.autoHeight,
    },
    props.iconContain ? "object-contain" : "object-cover",
  ];
});

const onImageError = function () {
  this.src = defaultImage;
};
</script>
