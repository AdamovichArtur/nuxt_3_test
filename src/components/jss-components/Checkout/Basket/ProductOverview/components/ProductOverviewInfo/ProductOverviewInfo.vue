<template>
  <sc-text
    class="text-16 sm:text-20 font-semibold mb-3"
    :field="{
      value: productTitle
    }"
  />
  <sc-text
    class="text-14 sm:text-16 mb-2"
    :field="{
      value: productId
    }"
  />
  <template v-for="({ Label = '', Value = '' }, index) in productAttributes">
    <div
      v-if="Label?.length && Value?.length"
      :key="index"
      data-test-id="attribute-item-wrapper-id"
      class="sm:block hidden"
    >
      <sc-text
        class="text-14 sm:text-16"
        :field="{
          value: `${Label}: ${Value}`
        }"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import ScText from '@/components/sitecore-components/text/ScText.vue'
import { ProductOverviewInfoProps } from './ProductOverviewInfo.d'

withDefaults(defineProps<ProductOverviewInfoProps>(), {
  productTitle: '',
  productId: '',
  productAttributes: () => [],
  productPicassoMessage: () => []
})
</script>
