<!-- eslint-disable vue/require-v-for-key -->
<template>
  <li
    v-if="menuData?.IncludeInMegaMenu?.value"
    ref="container"
    class="headerMainNavigationList show-for-medium"
    :class="[
      '--level-' + level,
      menuData?.active == true ? '--active' : '',
      menuData?.children.length > 0 ? '--hasChildren' : '',
      level == 2 ? 'grid-y' : 'grid-x'
    ]"
    tabindex="0"
    @click.stop="navItemClicked()"
    @mouseover="navItemOver($event)"
    @mouseout.stop="navItemOut($event)"
  >
    <sc-link
      v-if="level !== 1 || menuData.children.length == 0"
      :class="[level !== 1 ? 'cell' : '', level == 2 ? 'shrink' : '']"
      :field="menuData?.Link"
      :data-equalize-target="level === 2 ? 'navigationTitle' : null"
    >
      {{ menuData?.Title?.value }}
    </sc-link>
    <div
      v-else
      class="headerMainNavigationList__level1MenuItem"
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
      v-if="level == 1 && layout == '--animated'"
      class="--underlineEffect"
    />

    <div
      v-if="menuData?.children.length > 0"
      class="headerMainNavigationListChildren grid-x"
      :class="[level == 2 ? 'cell auto' : '']"
    >
      <div
        class="cell grid-x"
        :class="[level == 1 ? 'small-9' : 'small-12']"
      >
        <div
          v-if="level !== 3"
          v-equalize="level === 1"
          :class="[
            level == 1 ? 'grid-x cell small-12 headerMainNavigationList__levels' : 'cell small-12'
          ]"
        >
          <ul
            v-for="childItem in menuData?.children"
            class="cell small-4"
          >
            <header-main-navigation-list
              :menu-data="childItem"
              :level="level + 1"
              :active="false"
              @change-nav-img="changeNavImg"
            />
          </ul>
        </div>

        <ul
          v-for="childItem in menuData?.children"
          v-else
          class="cell small-12"
        >
          <header-main-navigation-list
            :menu-data="childItem"
            :level="level + 1"
            :active="false"
            @change-nav-img="changeNavImg"
          />
        </ul>

        <sc-link
          v-if="menuData?.ShowAllLinkLabel?.value.length"
          :class="[
            level == 1
              ? 'headerMainNavigationList__showAll'
              : 'headerMainNavigationListChildren__showAll'
          ]"
          :field="menuData?.Link"
        >
          {{ menuData?.ShowAllLinkLabel?.value }}
        </sc-link>
      </div>

      <div
        v-if="level == 1 && menuData?.Image"
        class="cell auto headerMainNavigationList__image"
      >
        <sc-image :media="menuImg.img || menuData.Image" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { Image as ScImage, Link as ScLink, Text as ScText } from '@sitecore-jss/sitecore-jss-vue'
import { onClickOutside } from '@vueuse/core'
import { reactive, ref } from 'vue'
import HeaderMainNavigationList from './_HeaderMainNavigationList.vue'

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
  },
  layout: {
    type: String,
    required: false,
    default: ''
  }
})

const menuImg = reactive({ img: props?.menuData?.Image })
const container = ref(null)

onClickOutside(container, () => clickedOutside())

function navItemOver(evt: Event) {
  if (props?.menuData?.Image?.value?.src?.length > 0) {
    emit('changeNavImg', props.menuData.Image)
    evt.stopImmediatePropagation()
  }
}

function navItemOut(evt: Event) {
  emit('changeNavImg', false)
  evt.stopImmediatePropagation()
}

function changeNavImg(img) {
  //Change the image if we are on the correct level
  if (menuImg !== img && props.level == 1) {
    menuImg.img = img
  } else {
    //Otherwise propagate the change image event
    emit('changeNavImg', img)
  }
}

function navItemClicked() {
  if (props?.menuData?.children?.length > 0) {
    //Only do the expand thing if we actually have children
    emit('navItemClicked', props.menuData)
  }
}

function clickedOutside() {
  emit('clickedOutside', props.menuData)
}

const emit = defineEmits({
  navItemClicked: () => {
    return true
  },
  changeNavImg: (img) => {
    return true
  },
  clickedOutside: () => {
    return true
  }
})
</script>

<style scoped lang="scss">
.headerMainNavigation {
  &.--piped {
    .headerMainNavigationList {
      &.--level-1 {
        font-weight: 700;
        border-right: get-var('borderVeryThin') solid get-color-var('gray');
        line-height: 2rem;

        &.--active {
          background-color: get-color-var('white');

          > a,
          > span {
            margin-bottom: -0.063rem;
            border-bottom: get-var('borderVeryThin') solid get-color-var('white');
          }
        }

        &:first-child {
          &.--active {
            > a,
            > span {
              border-left: get-var('borderVeryThin') solid get-color-var('gray');
            }
          }
        }

        > .headerMainNavigationListChildren {
          border: get-var('borderVeryThin') solid get-color-var('gray');
          border-top: 0;
        }
      }

      &.--level-2 {
        text-transform: none;

        > .headerMainNavigationListChildren {
          padding-bottom: 0;
        }
      }

      &.--level-3 {
        span,
        a {
          color: get-color-var('black');
          font-size: 0.85rem;
          font-weight: 400;
          line-height: 1.6;

          &::before {
            content: '⏵';
            padding-right: 0.3rem;
          }

          &:hover {
            color: get-color-var('primary');
          }
        }
      }

      &Children__showAll {
        font-size: 0.9rem;
        text-transform: uppercase;
        margin: 0;

        &::after {
          content: '⏵';
          padding-left: 0.3rem;
        }
      }

      &__image {
        img {
          padding: 0.0625rem;
          border: get-var('borderVeryThin') solid get-color-var('gray');
        }
      }
    }

    &.--megaMenuInline {
      .headerMainNavigationList {
        &.--level-1,
        &.--level-1.--active > span {
          border: 0;
        }

        &.--level-1 {
          > .headerMainNavigationListChildren {
            margin-top: 0;
            border: get-var('borderVeryThin') solid get-color-var('gray');
          }
        }
      }
    }
  }

  &.--animated {
    .headerMainNavigationList {
      height: 100%;

      &.--level-1 {
        > a,
        > .headerMainNavigationList__level1MenuItem {
          height: calc(100% - 3px);
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 1.1rem;
          line-height: 1;
          font-weight: 700;
          padding: calc(2.6rem - 3.5px) 1.3rem;
        }

        &.--hasChildren {
          svg {
            position: absolute;
            bottom: 1.1rem;
          }
        }

        & > .--underlineEffect {
          opacity: 0;
          transform: scaleX(0);
          bottom: 0;
        }

        &.--active {
          &.--hasChildren {
            > a,
            > span {
              &::after {
                top: calc(1rem + 0.2rem);
                border-color: get-color-var('primary');
              }
            }

            & > .--underlineEffect {
              opacity: 1;
              transform: scaleX(1);
            }
          }
        }
      }

      &__showAll {
        &:hover {
          color: get-color-var('primary', 'dark');
        }

        &:hover::after {
          border-color: get-color-var('primary', 'dark');
        }
      }
    }

    &.--noChevron .headerMainNavigationList {
      &.--level-1 {
        &.--active.--hasChildren,
        &.--hasChildren {
          > a,
          > span {
            &::after {
              display: none;
            }
          }
        }

        > a::after {
          display: none;
        }
      }
    }
  }
}

.headerMainNavigationList {
  cursor: pointer;
  color: var(--mainMenuFontColor);

  ul {
    margin: 0;
  }

  &.--level-1 {
    > a {
      padding: 0 1rem;
      text-transform: uppercase;

      &:hover {
        color: get-color-var('primary');
      }
    }

    .headerMainNavigationList__level1MenuItem {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      text-transform: uppercase;

      &:hover {
        color: get-color-var('primary');
      }
    }

    > a {
      color: var(--mainMenuFontColor);
    }

    .--noChevron & {
      &.--hasChildren {
        svg {
          display: none;
        }
      }
    }

    &.--hasChildren {
      svg {
        margin-left: 0.25rem;
        transition: all 0.3s;
      }
    }

    &.--active {
      color: get-color-var('primary');

      svg {
        transform: rotate(180deg);
      }
    }

    &:not(.--active) {
      > .headerMainNavigationListChildren {
        visibility: hidden;
      }
    }

    > .headerMainNavigationListChildren {
      display: flex;
      position: absolute;
      padding: 1rem;
      top: 100%;
      left: 0;
      right: 0;
      background: get-color-var('white');
      border: 0.1rem solid get-color-var('black');
      margin-top: 0.063rem;
      z-index: 3;

      .--vertical & > div > div:first-child {
        //If we will show the link groups in row or col direction
        display: block;
        column-count: 3;

        > ul {
          width: 100%;
          break-inside: avoid;
        }
      }
    }
  }

  &.--level-2 {
    margin: 0 0.5rem;
    padding-bottom: 1rem;
    height: 100%;
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: get-var('borderThin') solid get-color-var('gray', 'medium');

    > span,
    > a {
      margin: 0 0 1rem;
      color: get-color-var('black');
      min-height: fit-content;

      &:hover {
        color: get-color-var('primary');
      }
    }

    > .headerMainNavigationListChildren {
      min-height: fit-content;

      > div {
        align-content: space-between;
      }
    }
  }

  &.--level-3 {
    span,
    a {
      font-weight: 400;
      text-transform: capitalize;
      color: get-color-var('black');

      &:hover {
        color: get-color-var('primary');
      }
    }
  }

  &__levels {
    > ul {
      margin-bottom: 1rem;
    }
  }

  &__showAll,
  &Children__showAll {
    font-weight: bold;
    font-size: 0.8rem;
    padding-left: 1rem;
    padding-top: 1rem;
    text-transform: none;
  }

  &Children__showAll {
    color: get-color-var('secondary');

    &:hover {
      color: get-color-var('primary');
    }
  }

  &__showAll {
    color: get-color-var('primary');

    &:hover {
      color: get-color-var('black');
    }

    &::after {
      content: '';
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      top: -0.05rem;
      margin-left: 0.3rem;
      transform: rotate(-45deg);
      border-bottom: 0.1rem solid get-color-var('primary');
      border-right: 0.1rem solid get-color-var('primary');
      position: relative;
    }

    &:hover::after {
      border-color: get-color-var('black');
    }
  }

  &__image {
    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
}

.--underlineEffect {
  transition: opacity 0.3s, transform 0.3s;
  transform-origin: center;
  background: get-color-var('primary');
  width: 100%;
  height: 3px;
}
</style>
