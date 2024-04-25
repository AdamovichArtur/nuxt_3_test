<template>
  <div class="productCategories px-[10px]">
    <content-header :fields="routeData?.fields" />

    <template
      v-for="category in fields?.Categories"
      :key="category?.CategoryPageUrl"
    >
      <category-section
        class="mb-10"
        :category="category"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { RouteData } from '@sitecore-jss/sitecore-jss-vue'
import { inject, provide } from 'vue'
import { hideElement } from '@/utils/utils'
import ContentHeader from '../../Page/ContentHeader/ContentHeader.vue'
import CategorySection from './_ProductCategorySection.vue'

const props = defineProps({
  fields: {
    type: Object,
    default: () => {}
  }
})

const routeData: RouteData = inject('routeData')

provide('ProductCardLayout', props?.fields?.ProductCardLayout?.value)
provide('USPListVisibilityClasses', hideElement(props?.fields?.USPListVisibility?.value))
</script>
