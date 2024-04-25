<template>
  <ul
    class="footerContactBar"
    :class="[
      footerData?.Layout?.value ? '-' + footerData.Layout.value : '',
      '--separator-' + separator
    ]"
  >
    <li v-if="footerData?.Email?.value">
      <svg-icon-envelope
        v-if="separator == 'icon'"
        :skin="siteSettings?.skin"
      />
      <a :href="'mailto:' + footerData.Email.value">{{ footerData.Email.value }}</a>
    </li>
    <li v-if="footerData?.Telephone?.value">
      <svg-icon-phone
        v-if="separator == 'icon'"
        :skin="siteSettings?.skin"
      />
      <a :href="'tel:' + footerData.Telephone.value">{{ footerData.Telephone.value }}</a>
    </li>
    <li v-if="footerData?.Address?.value">
      <svg-icon-location
        v-if="separator == 'icon'"
        :skin="siteSettings?.skin"
      /><span> {{ footerData.Address.value }}</span>
    </li>
    <li v-if="footerData?.ShopName?.value">
      <svg-icon-home
        v-if="separator == 'icon'"
        :skin="siteSettings?.skin"
      /><span> {{ footerData.ShopName.value }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue'
import SvgIconPhone from '../SvgIcons/SvgIconPhone.vue'
import SvgIconEnvelope from '../SvgIcons/SvgIconEnvelope.vue'
import SvgIconLocation from '../SvgIcons/SvgIconLocation.vue'
import SvgIconHome from '../SvgIcons/SvgIconHome.vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const footerData = reactive(props.fields)

const separator = footerData.ContactBarItemSeparator?.value

const siteSettings = inject('siteSettings')
</script>

<style scoped lang="scss">
@import 'foundation-sites/scss/foundation';

.footerContactBar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  background: get-color-var('gray');
  color: get-color-var('white');

  @include breakpoint(medium) {
    justify-content: end;
  }

  &.-accent {
    background: get-color-var('primary');
  }

  &.-colorful {
    background: get-color-var('secondary');
  }

  &.--separator-pipe {
    li {
      border-left: 0.1rem solid get-color-var('white');
    }
  }

  li {
    flex-grow: 1;
    flex-basis: auto;
    margin: 0.25em -0.1rem;
    padding: 0 1em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
      border-left: 0;
    }

    @include breakpoint(medium) {
      flex-grow: 0;
    }

    a {
      color: get-color-var('white');
    }
  }

  svg {
    line-height: 1em;
    height: 1em;
    margin-right: 0.5em;
    fill: get-color-var('white');
  }
}
</style>
