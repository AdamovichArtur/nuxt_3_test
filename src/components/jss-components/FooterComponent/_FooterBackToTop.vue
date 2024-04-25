<template>
  <div
    v-if="label"
    class="footerBackToTop"
    @click="scrollToTop"
  >
    <sc-text :field="label" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Text as ScText } from '@sitecore-jss/sitecore-jss-vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const label = reactive(props.fields?.BackToTopLabel)

function scrollToTop() {
  window.scrollTo(0, 0)
}
</script>

<style scoped lang="scss">
.footerBackToTop {
  display: block;
  width: 100%;
  background: get-color-var('gray');
  text-align: center;
  color: get-color-var('black');
  padding: 0.5rem 0;
  cursor: pointer;

  span {
    &::after {
      content: '';
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      transform: rotate(-45deg);
      border-top: 0.1rem solid get-color-var('black');
      border-right: 0.1rem solid get-color-var('black');
      margin-left: 1em;
    }
  }
}
</style>
