<template>
  <div class="grid-x styleSwitcher">
    <nav>
      <select
        v-if="siteSettings"
        v-model="siteSettings.skin"
        @change="setSkin"
      >
        <option>wireframe</option>
        <option>solstro</option>
        <option>itzala</option>
        <option>branded</option>
        <option>dakvenster</option>
      </select>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/GlobalStore'

const siteSettingsData = useGlobalStore()

const props = defineProps({
  skin: {
    type: String,
    required: false,
    default: ''
  },
  siteSettings: {
    type: Object,
    required: false,
    default: () => {}
  }
})

let setSkin = () => {
  siteSettingsData.setSkin(props.siteSettings.skin)
}
</script>

<style lang="scss">
.styleSwitcher {
  position: fixed;
  bottom: 0;
  right: 0;
  background: get-color-var('secondary');
  padding: 1rem;
  opacity: 0.2;
  &:hover {
    opacity: 1;
  }
}
</style>
