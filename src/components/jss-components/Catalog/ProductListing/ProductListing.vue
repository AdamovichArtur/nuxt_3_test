<template>
  <div class="productListing px-[10px]">
    <content-header :fields="routeData?.fields" />

    <category-section
      :products="fields?.Products"
      class="productListing"
    />
  </div>
</template>

<script setup lang="ts">
import { RouteData } from '@sitecore-jss/sitecore-jss-vue'
import { inject, provide } from 'vue'
import { hideElement } from '@/utils/utils'
import ContentHeader from '../../Page/ContentHeader/ContentHeader.vue'
import CategorySection from '../ProductCategories/_ProductCategorySection.vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const routeData: RouteData = inject('routeData')

provide('isListingPage', true)
provide('ProductCardLayout', props?.fields?.ProductCardLayout?.value)
provide('USPListVisibilityClasses', hideElement(props?.fields?.USPListVisibility?.value))
</script>
