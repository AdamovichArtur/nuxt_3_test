<template>
  <li
    v-if="menuData?.IncludeInOffCanvas?.value"
    class="headerOffCanvasList cell small-12"
    :class="[
      '--level-' + (level + 1),
      menuData?.activeInBurgerMenu == true ? '--active' : '',
      menuData?.children.length > 0 ? '--hasChildren' : ''
    ]"
    tabindex="-1"
    @click.stop="selfClicked()"
  >
    <sc-link
      v-if="menuData?.children.length == 0"
      class="headerOffCanvasList__menuItem"
      :field="menuData?.Link"
    >
      <sc-text
        tag="span"
        :field="menuData?.Title"
      />
    </sc-link>
    <div
      v-else
      class="headerOffCanvasList__menuItem"
    >
      <sc-text
        tag="span"
        :field="menuData?.Title"
      />
      <base-icon
        name="chevron-down-light"
        class="w-4 h-4"
      />
    </div>

    <div
      v-if="menuData?.children"
      class="headerOffCanvasListChildren"
    >
      <div class="headerOffCanvasList__subList">
        <ul
          v-for="(childItem, index) in menuData?.children"
          :key="index"
        >
          <header-off-canvas-list
            :menu-data="childItem"
            :level="level + 1"
            :active-in-burger-menu="false"
          />
        </ul>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { Link as ScLink, Text as ScText } from '@sitecore-jss/sitecore-jss-vue'
import HeaderOffCanvasList from './_HeaderOffCanvasList.vue'

function selfClicked() {
  if (props.menuData?.children.length > 0) {
    props.menuData.activeInBurgerMenu = !props.menuData.activeInBurgerMenu
  }
}

const props = defineProps({
  menuData: {
    type: Object,
    required: false,
    default: () => {}
  },
  level: {
    type: Number,
    required: false,
    default: 0
  }
})
</script>

<style scoped lang="scss">
.headerOffCanvasList {
  --mainColor: var(--offCanvasMenuFontColor);

  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  cursor: pointer;

  &__menuItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.8rem 0.75rem 1rem;
    color: var(--mainColor);
    font-weight: 700;
    border-bottom: 0.1rem solid get-color-var('gray');

    svg {
      transition: all 0.3s;
    }
  }

  & span,
  .--level-1 {
    background: var(--offCanvasMenuBackgroundColor);
    background-image: var(--offCanvasMenuBackgroundImage);
  }

  > .headerOffCanvasListChildren {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s;
  }

  > .headerOffCanvasListChildren > .headerOffCanvasList__subList {
    padding: 0;
    margin: 0;
    overflow: hidden;

    span {
      background: var(--offCanvasMenuBackgroundColor);
    }
  }

  &.--active {
    > .headerOffCanvasList__menuItem {
      svg {
        transform: rotate(180deg);
      }
    }

    > .headerOffCanvasListChildren {
      grid-template-rows: 1fr;
    }
  }
}
</style>
