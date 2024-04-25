<template>
  <section>
    <div
      v-if="!isListingPage"
      class="flex gap-3 items-center mb-6"
    >
      <sc-text
        tag="h2"
        class="text-[20px] sm:text-[24px] md:text-[30px]"
        :field="category?.CategoryTitle"
      />
      <vlx-button
        :link-url="category?.CategoryPageUrl"
        :label="$t('see-all')"
        :chevron="true"
        :is-bottom-indent="false"
        :text-only="true"
      />
    </div>
    <div
      v-equalize
      class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4"
    >
      <template
        v-for="product in productList"
        :key="product?.ProductData?.Id"
      >
        <product-card
          :product="product"
          :enable-add-to-cart="isListingPage"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, provide, reactive } from 'vue'

import { Text as ScText } from '@sitecore-jss/sitecore-jss-vue'
import VlxButton from '@/components/self-components/FormComponents/BaseButton/BaseButton.vue'
import ProductCard from '../ProductCard/ProductCard.vue'

const props = defineProps({
  category: {
    type: Object,
    default: () => {}
  },
  products: {
    type: Array,
    default: () => []
  }
})

const isListingPage: boolean = inject('isListingPage', false)
const productList: any[] = reactive(props?.category?.Products || props?.products)

provide('categoryPageUrl', props?.category?.CategoryPageUrl)
</script>
