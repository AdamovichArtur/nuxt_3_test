<template>
  <modal-component
    v-if="fields?.Link?.value?.modal"
    class="linkOrModal"
    :fields="fields"
  >
    <slot />

    <a
      v-if="fields?.Link?.value?.text"
      class="text-velux-splash-blue"
    >
      {{ fields.Link.value.text }}
    </a>
  </modal-component>
  <sc-link
    v-else
    class="linkOrModal text-velux-splash-blue"
    :field="fields?.Link"
  >
    <slot />
  </sc-link>
</template>

<script setup lang="ts">
import { Link as ScLink } from '@sitecore-jss/sitecore-jss-vue'
import { inject, reactive } from 'vue'
import ModalComponent from './ModalComponent/ModalComponent.vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  },
  name: {
    type: String,
    required: false,
    default: () => {}
  }
})

let routeData: any = inject('routeData')

let fields: any

if (props?.fields) {
  fields = reactive(props.fields)
}

if (routeData && props?.name) {
  for (let i = 0; i < routeData.placeholders[props?.name].length; i++) {
    if (routeData.placeholders[props?.name][i].componentName == 'ModalComponent') {
      fields = reactive(routeData.placeholders[props?.name][i]?.fields)
    }
  }
}
</script>
