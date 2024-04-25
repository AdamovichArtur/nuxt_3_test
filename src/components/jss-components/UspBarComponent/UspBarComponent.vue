<template>
  <div
    class="uspBarComponent grid-x"
    :class="[visibilityClasses, layoutClass]"
  >
    <usp-bar-item
      v-for="item in uspItems"
      :key="item?.uid"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import { hideElement, ScreenSizes } from '@/utils/utils'
import { reactive } from 'vue'
import UspBarItem from './_UspBarItem.vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const uspItems = reactive([])

//Add the active state to every uspItem, to not mutate the prop
props.fields?.UspItems?.forEach((elm: Object) => {
  uspItems.push({ ...elm, active: false })
})

const visibilityClasses = hideElement(props?.fields?.Visibility?.value)
const layoutClass = props?.fields?.Layout?.value ? '--' + props?.fields?.Layout?.value : ''

const animationTime: number = 5000 //USP rotation time
let carouselTimeout: ReturnType<typeof setTimeout>
let currentItem: number = 0

if (uspItems.length > 1) {
  if (typeof window != 'undefined') {
    window.addEventListener('breakpointChanged', (evt: any) => {
      //If we change to small we need to set the timeout
      if (evt.detail == 'sm') {
        carouselTimeout = setTimeout(() => {
          rotateUspItem()
        }, animationTime)
      } else {
        //If we change away from small we need to clear the timeout
        clearTimeout(carouselTimeout)
      }
    })
  }

  if (ScreenSizes.isMobile) {
    //If we are on small, we need to set the timeout
    carouselTimeout = setTimeout(() => {
      rotateUspItem()
    }, animationTime)
  }

  const rotateUspItem = () => {
    //Hide the current item
    if (uspItems[currentItem]) {
      uspItems[currentItem].active = false

      //Go to next item or loop around if at the end
      if (currentItem + 1 < uspItems.length) {
        currentItem++
      } else {
        currentItem = 0
      }

      //show the new current item
      uspItems[currentItem].active = true
    }

    //Wait for some time and do it again
    carouselTimeout = setTimeout(() => {
      rotateUspItem()
    }, animationTime)
  }

  //Activate the first element if it exists
  if (typeof uspItems[0] == 'object') {
    uspItems[0].active = true
  }
}
</script>

<style scoped lang="scss">
:global(.uspBarComponent) {
  --uspBarBackgroundColor: #{get-color-var('gray', 'light')};
  --uspBarBorder: #{get-var('borderVeryThin')} solid #{get-color-var('gray', 'medium')};
  --uspBarItemTextColor: #{get-color-var('black')};
}

//:global(.g-mainWrapper.-branded .uspBarComponent) {}

:global(.g-mainWrapper.-dakvenster .uspBarComponent) {
  --uspBarBackgroundColor: #{get-color-var('secondary')};
  --uspBarBorder: #{get-var('borderVeryThin')} solid #{get-color-var('white')};
  --uspBarItemTextColor: #{get-color-var('white')};
}

:global(.g-mainWrapper.-itzala .uspBarComponent) {
  --uspBarBackgroundColor: #{get-color-var('primary')};
  --uspBarItemTextColor: #{get-color-var('white')};
}

//:global(.g-mainWrapper.-solstro .uspBarComponent) {}

@import 'foundation-sites/scss/foundation';
.uspBarComponent {
  background-color: var(--uspBarBackgroundColor);
  border: var(--uspBarBorder);
  border-right: 0;
  border-left: 0;
  width: 100%;

  @include breakpoint(small only) {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
