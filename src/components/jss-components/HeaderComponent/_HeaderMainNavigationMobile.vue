<template>
  <div class="cell shrink hide-for-medium text-right grid-x">
    <base-icon
      name="bars-light"
      class="w-7 h-7 mb-0.5 ml-2 pl-2 cursor-pointer"
      @click="toggleOC()"
    />
  </div>
  <HeaderOffCanvas />
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { useGlobalStore } from '@/stores/GlobalStore'
import { inject, reactive } from 'vue'
import HeaderOffCanvas from './_HeaderOffCanvas.vue'

let globalStore = useGlobalStore()

const navigation: any = inject('headerNavigation')

let toggleOC = (show?) => {
  globalStore?.showOverlay(function () {
    navigation.showOC = false
  })
  navigation.showOC = show || !navigation.showOC
}
</script>
