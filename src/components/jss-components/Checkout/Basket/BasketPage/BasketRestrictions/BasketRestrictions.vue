<template>
  <div
    class="mt-4 mb-2"
    :class="{
      hidden: basketRestrictions.length === 0
    }"
  >
    <div
      v-for="(item, index) in basketRestrictions"
      :key="index"
      class="mt-4"
    >
      <base-message v-bind="{ type: 'error', messageText: item?.Description || '' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBasketStore } from '@/stores/BasketStore/BasketStore'

import BaseMessage from '@/components/self-components/BaseMessage/BaseMessage.vue'

const basketStore = useBasketStore()

const { basket } = basketStore

const basketRestrictions = computed<string>(() => {
  return basket?.basketRestrictions || basket?.defaultMessage || []
})
</script>
