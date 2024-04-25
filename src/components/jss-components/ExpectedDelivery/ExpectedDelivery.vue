<template>
  <div class="sm:py-4 py-0 bg-velux-white">
    <sc-rich-text
      class="text-16"
      :field="expectedDeliveryText"
    />
  </div>
</template>

<script setup lang="ts">
import ScRichText from '@/components/sitecore-components/rich-text/ScRichText.vue'
import { computed } from 'vue'
import { ExpectedDeliveryField } from './ExpectedDelivery.d'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'

const basketStore = useBasketStore()

const { basket } = basketStore

const expectedDeliveryText = computed<ExpectedDeliveryField>(() => {
  return { value: basket?.expectedDeliveryTime || '' }
})
</script>
