<template>
  <sc-link
    v-if="isLinkActive"
    :field="props?.fields?.Link"
    class="modalHelpCard"
  >
    <sc-image :media="props?.fields?.Image" />
    <sc-text :field="props?.fields?.Title" />
  </sc-link>
</template>

<script setup lang="ts">
import { Text as ScText, Image as ScImage, Link as ScLink } from '@sitecore-jss/sitecore-jss-vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const isLinkActive: boolean = props?.fields?.Link?.value?.href == '' ? false : true
</script>

<style scoped lang="scss">
.--tiles {
  .gridCell {
    .modalHelpCard {
      background-image: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.25),
        get-color-var('white', 'dark')
      );
      color: get-color-var('secondary');
      font-weight: 700;

      &:hover {
        color: get-color-var('primary');
      }

      & span {
        text-transform: uppercase;
      }
    }
  }
}

:global(.gridComponent.--helpModal .gridCell) {
  padding: 0;
}

.modalHelpCard {
  height: 100%;
  display: flex;
  align-items: center;
  flex-flow: row;
  background-repeat: repeat-x;
  border-bottom: 0.05rem solid get-color-var('gray');
  border-top: 0.05rem solid get-color-var('white');
  font-size: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  color: get-color-var('black');

  & img,
  span {
    padding-left: 0.5rem;
  }

  & img {
    max-width: 3rem;
  }

  &:hover {
    color: get-color-var('primary');
    background: get-color-var('white', 'dark');
  }

  &:focus-visible {
    outline-offset: 0;
  }
}
</style>
