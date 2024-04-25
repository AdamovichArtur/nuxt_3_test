<template>
  <div
    class="flex gap-2 justify-start items-center text-velux-splash-blue hover:cursor-pointer hover:text-velux-blue"
  >
    <sc-text
      class="mb-0 text-16"
      :field="headerText"
    />
    <base-icon
      name="up-arrow-icon"
      class="w-3 h-3 transition-all transform"
      :class="isVoucherBlockActive ? 'rotate-0 test-rotate-0' : 'rotate-180 test-rotate-180'"
      data-test-id="test-base-icon-id"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ScText from '@/components/sitecore-components/text/ScText.vue'
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'

import { VoucherVisibilityControlProps } from './VoucherVisibilityControl.d'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<VoucherVisibilityControlProps>(), {
  headerText: () => ({ value: '' }),
  modelValue: false
})

const isVoucherBlockActive = computed<boolean>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
