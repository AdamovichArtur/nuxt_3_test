<!-- eslint-disable vue/valid-v-for -->
<template>
  <ul
    v-if="headerNavigation?.mainNavigation"
    class="headerMainNavigation show-for-medium grid-x"
    :class="[
      fields?.MenuGroupFlowDirection?.value == 'vertical' ? '--vertical' : '',
      props?.fields?.Chevron?.value == 'none' ? '--noChevron' : '',
      layoutClass
    ]"
  >
    <header-main-navigation-list
      v-for="level1 in headerNavigation.mainNavigation"
      class="cell small-12 medium-shrink"
      :menu-data="level1"
      :level="1"
      :layout="layoutClass"
      @nav-item-clicked="navClicked"
      @clicked-outside="clickedOutside"
    />
  </ul>
</template>

<script setup lang="ts">
import HeaderMainNavigationList from './_HeaderMainNavigationList.vue'
import { inject } from 'vue'

var headerNavigation: any = inject('headerNavigation')

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {}
  }
})

let layoutClass: string

switch (props?.fields?.Layout?.value) {
  case 'piped':
    layoutClass = '--piped'
    break
  case 'animated':
    layoutClass = '--animated'
    break
  case 'default':
  default:
    layoutClass = ''
    break
}

function navClicked(item: any) {
  //deactivate all nav items
  //Activate the selected item and all it's parents
  const itemActive = item.active

  for (let i = 0; i < headerNavigation.mainNavigation.length; i++) {
    recursiveClearing(headerNavigation.mainNavigation[i])
  }
  item.active = !itemActive
}

function recursiveClearing(menuItem: any) {
  menuItem.active = false

  for (let i = 0; i < menuItem.children.length; i++) {
    recursiveClearing(menuItem.children[i])
  }
}

function clickedOutside(item: any) {
  item.active = false
}
</script>

<style scoped lang="scss">
.headerMainNavigation {
  height: 100%;
  align-items: center;
  list-style-type: none;
  margin: 0;
  background-color: var(--mainMenuBackgroundColor);

  &.--piped {
    border-top: get-var('borderThin') solid get-color-var('gray');
    border-bottom: get-var('borderVeryThin') solid get-color-var('gray');
  }

  &.--megaMenuRow {
    position: relative;
  }

  &.--megaMenuInline {
    background-color: get-color-var('white');

    &.--piped {
      border: 0;
    }
  }
}
</style>
