<template>
  <sc-link
    v-if="fields.Link?.value?.href"
    class="imageComponent"
    data-test-id="sc-link-id"
    :field="fields.Link"
  >
    <sc-image :media="fields.Image" />
  </sc-link>

  <sc-image
    v-else
    class="imageComponent"
    data-test-id="sc-image-id"
    :media="fields.Image"
  />
</template>

<script setup lang="ts">
import { Link as ScLink, Image as ScImage } from '@sitecore-jss/sitecore-jss-vue'

defineProps({
  fields: {
    type: Object,
    required: true,
    default: () => {}
  }
})
</script>
