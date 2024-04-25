<template>
  <div
    ref="loaderElm"
    class="loader"
    :class="thisIsLoading ? '--loading' : '--notLoading'"
  >
    <div
      class="loaderElm"
      :style="{ height: targetHeight.value, width: targetWidth.value }"
    >
      <div
        class="loaderAnim"
        :class="'--' + loaderAnimationStyle"
      />
    </div>
    <div
      ref="loaderContent"
      class="loaderContent"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { convertPixelsToRem } from '@/utils/utils'

// Refrences to the main elements
const loaderElm = ref(null)
const loaderContent = ref(null)

const props = defineProps({
  initialHeight: { type: Number, default: 12 }, //The initial height defined in rem
  loaderDisplayStyle: { type: String, default: 'block' },
  loaderAnimationStyle: { type: String, default: 'spinner' },
  /* The background color of the parent element so that the animation fades to this color.
      This is only needed if pulseBackground is true */
  backgroundColor: { type: String, default: 'var(--colorLightGray)' },
  pulseBackground: { type: Boolean, default: false },
  pulseBackgroundColor: { type: String, default: 'var(--colorMediumGray)' },
  isLoading: { type: Boolean, default: false }
})

// Set the initial height of the loader element
let targetHeight = reactive({ value: props.initialHeight + 'rem' })
const transitionTime = 300 // The timing of the scaling and fading animations
const pulseAnimationTime = 2 // Pulse animation time in seconds
let transitionTimeCss = transitionTime + 'ms' // Adding units for CSS
const thisIsLoading = ref(props.isLoading)
const targetWidth = reactive({ value: 'auto' })
let pulseAnimCssValue = props.pulseBackground
  ? 'loaderPulsingBg ' + pulseAnimationTime + 's linear infinite'
  : 'none'

const startLoading = () => {
  thisIsLoading.value = true
}

const stopLoading = () => {
  if (loaderElm.value) {
    targetWidth.value = convertPixelsToRem(loaderContent.value.offsetWidth) + 'rem'
    targetHeight.value = convertPixelsToRem(loaderContent.value.offsetHeight) + 'rem'

    //After the transition animation is done, we can hide the spinner and show the content underneath
    setTimeout(() => {
      thisIsLoading.value = false
    }, transitionTime * 3 + 100)
  }
}

watch(
  () => props.isLoading,
  (isLoading) => {
    isLoading ? startLoading() : stopLoading()
  }
)
</script>

<style scoped lang="scss">
.loader {
  --colorLightGray: #{get-color-var('gray', 'light')};
  --colorMediumGray: #{get-color-var('gray')};
  width: 100%;
  position: relative;
  pointer-events: none;

  &.--loading {
    .loaderContent {
      position: absolute;
      width: 100%;
      visibility: hidden;
    }

    .loaderElm {
      transition: none;
      opacity: 1;
      transition: v-bind(transitionTimeCss) ease-in-out height,
        v-bind(transitionTimeCss) ease-out opacity;
    }
  }

  &.--notLoading {
    .loaderContent {
      visibility: visible;
    }

    .loaderElm {
      opacity: 0;
      position: absolute;
    }
  }

  &Elm {
    background: v-bind(backgroundColor);
    animation: v-bind(pulseAnimCssValue);
    opacity: 1;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    transition: v-bind(transitionTimeCss) ease-in-out height,
      v-bind(transitionTimeCss) ease-out opacity;
    transition-delay: 0s, v-bind(transitionTimeCss);
    width: 100%;
  }

  .loaderAnim {
    flex: 0 0 auto;

    &.--spinner {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin: 2rem;
      display: inline-block;
      border-top: 0.2rem solid get-color-var('secondary');
      border-right: 0.2rem solid transparent;
      box-sizing: border-box;
      animation: loaderRotation 1s linear infinite;
    }
  }
}
</style>

<style>
@keyframes loaderRotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loaderPulsingBg {
  0% {
    background: v-bind('props.backgroundColor');
  }

  50% {
    background: v-bind('props.pulseBackgroundColor');
  }

  100% {
    background: v-bind('props.backgroundColor');
  }
}
</style>
