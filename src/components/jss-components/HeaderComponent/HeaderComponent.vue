<template>
  <header class="headerComponent">
    <placeholder
      name="header-topbar"
      :rendering="routeData"
    />
    <div class="headerComponentInlineContainer cell grid-x align-justify mb-4 px-[10px]">
      <placeholder
        name="header-logo"
        :rendering="routeData"
      />
      <div class="grid-x align-middle align-right --snap-right">
        <placeholder
          v-if="routeData?.placeholders['mega-menu-inline']?.length > 0"
          class="cell shrink --megaMenuInline"
          name="mega-menu-inline"
          :rendering="routeData"
        />
        <placeholder
          v-if="!ScreenSizes.isMobile"
          class="--languageSelector cell shrink"
          name="header-languageselector"
          :rendering="routeData"
        />

        <link-or-modal
          :rendering="routeData"
          name="help-modal"
          class="--headerModal --fitContentModal cell shrink pl-2 ml-0"
        >
          <base-icon
            name="messages-question-light"
            class="w-7 h-7 mb-0.5"
          />
        </link-or-modal>
        <placeholder
          class="miniBasket --miniBasket cell shrink"
          name="header-minibasket"
          :rendering="routeData"
        />

        <header-my-account-button
          v-if="routeData?.placeholders['my-account-modal-button']?.length > 0"
        />

        <placeholder
          name="mobile-menu"
          :rendering="routeData"
        />
      </div>
    </div>
    <placeholder
      class="cell --megaMenuRow"
      name="mega-menu-row"
      :rendering="routeData"
    />
    <placeholder
      name="header"
      :rendering="routeData"
    />
  </header>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { useGlobalStore } from '@/stores/GlobalStore'
import { ScreenSizes } from '@/utils/utils'
import { Placeholder, RouteData } from '@sitecore-jss/sitecore-jss-vue'
import { inject, provide, reactive, ref } from 'vue'
import ModalComponent from '../ModalComponent/ModalComponent.vue'
import HeaderMyAccountButton from './_HeaderMyAccountButton.vue'

const routeData: RouteData = inject('routeData')
let linkOrModal: any = inject('linkOrModal')
let callUsTime = ref(0)

let globalStore = useGlobalStore()

var navigation = reactive({
  showOC: false,
  mainNavigation: globalStore?.mainNavigation
})

provide('headerNavigation', navigation)
provide('modalComponent', ModalComponent)
provide('callUsTime', callUsTime)
</script>

<style scoped lang="scss">
:global(.headerComponent) {
  // Main Menu
  --mainMenuBackgroundColor: none;
  // Off Canvas Menu
  --offCanvasMenuBackgroundColor: #{get-color-var('black')};
  --offCanvasMenuBackgroundImage: none;
  --offCanvasMenuFontColor: #{get-color-var('white')};
  // Top Bar
  --topBarBackgroundColor: #{get-color-var('black')};
}

:global(.g-mainWrapper.-branded .headerComponent) {
  // Main Menu
  --mainMenuFontColor: #333;
}

:global(.g-mainWrapper.-dakvenster .headerComponent) {
  // Main Menu
  --mainMenuBackgroundColor: #{get-color-var('gray', 'light')};
  --mainMenuFontColor: #{get-color-var('primary')};
  // Off Canvas Menu
  --offCanvasMenuBackgroundColor: #{get-color-var('white', 'dark')};
  --offCanvasMenuBackgroundImage: linear-gradient(
    180deg,
    #{get-color-var('white')},
    #{get-color-var('white', 'dark')}
  );
  --offCanvasMenuFontColor: #{get-color-var('primary')};
}

:global(.g-mainWrapper.-itzala .headerComponent) {
  // Main Menu
  --mainMenuFontColor: #{get-color-var('black')};
  // Off Canvas Menu
  --offCanvasMenuBackgroundColor: #{get-color-var('gray', 'dark')};
  // Top Bar
  --topBarBackgroundColor: #{get-color-var('primary')};
}

:global(.g-mainWrapper.-solstro .headerComponent) {
  // Main Menu
  --mainMenuFontColor: #{get-color-var('gray')};
  // Off Canvas Menu
  --offCanvasMenuBackgroundColor: #{get-color-var('white')};
  --offCanvasMenuFontColor: #{get-color-var('black')};
}

.--snap-right {
  margin-left: auto;
}

.headerComponent {
  position: relative;
  padding: 1rem 0;

  &InlineContainer {
    position: relative;
  }

  :deep(.--languageSelector) {
    margin-left: 1rem;
  }
}
</style>
