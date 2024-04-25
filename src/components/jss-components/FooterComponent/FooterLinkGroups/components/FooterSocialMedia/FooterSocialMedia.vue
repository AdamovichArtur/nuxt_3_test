<template>
  <div class="flex gap-2 flex-wrap">
    <sc-link
      v-for="(socialMediaItem, index) in socialMediaItems"
      :key="socialMediaItem?.id || index"
      :field="socialMediaItem?.fields?.Link"
    >
      <sc-image
        class="rounded-full sm:w-12 sm:h-12 h-11 w-11 overflow-hidden"
        :media="socialMediaItem?.fields?.Image"
      />
    </sc-link>
  </div>
</template>

<script setup lang="ts">
import { Link as ScLink } from '@sitecore-jss/sitecore-jss-vue'
import ScImage from '@/components/sitecore-components/image/ScImage.vue'

import { FooterSocialMediaProps } from './FooterSocialMedia.d'

withDefaults(defineProps<FooterSocialMediaProps>(), {
  socialMediaItems: () => []
})
</script>
