<template>
  <div
    class="footerBottomBar grid-x grid-padding-y grid-padding-x"
    :class="footerData?.Layout?.value ? '-' + footerData.Layout.value : ''"
  >
    <div class="cell small-12 medium-6 text-center medium-text-left">
      <div class="flex flex-wrap items-center gap-4 sm:gap-8 justify-center sm:justify-start">
        <sc-image
          v-for="image in footerData?.PaymentIcons"
          :key="image.id"
          :media="image.fields?.Image"
          class="h-8 w-auto"
        />
      </div>
    </div>
    <div class="cell small-12 medium-6 text-center medium-text-right">
      <ul class="footerBottomBarLinks">
        <li
          v-for="legalLink in footerData?.LegalLinks"
          :key="legalLink.id"
          class="footerBottomBarItem"
        >
          <sc-link
            :field="legalLink.fields?.Link"
            class="footerBottomBarLink"
          >
            <sc-text :field="legalLink.fields?.Label" />
          </sc-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Image as ScImage, Link as ScLink, Text as ScText } from '@sitecore-jss/sitecore-jss-vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const footerData = reactive(props.fields)
</script>

<style scoped lang="scss">
.footerBottomBar {
  &Images {
    list-style: none;
    padding: 0;
    margin-left: 0;
    margin-bottom: 0;
  }
  &Item {
    display: inline-block;
    margin-left: 0.5rem;

    &:not(.--icon) {
      border-left: 0.1rem solid get-color-var('gray');
    }
    padding-left: 0.5em;

    &:first-child {
      border: 0;
    }

    .-colorful & {
      border-color: get-color-var('secondary');
    }
  }
  &Image {
    height: 2rem;
    width: auto;
    margin: 0 0.5rem;
  }
  &Links {
    list-style: none;
    padding: 0;
    margin-left: 0;
    margin-bottom: 0;
  }
  &Link {
    color: get-color-var('gray', 'light');

    .-colorful & {
      color: get-color-var('secondary');
    }
  }
}
</style>
