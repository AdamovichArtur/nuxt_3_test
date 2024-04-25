<template>
  <sc-link
    v-if="isLinkActive"
    :field="item?.fields?.Link"
    class="uspBarItem grid-x cell small-12 medium-auto large-auto"
    :class="[visibilityClasses, item?.active ? '--active' : '']"
  >
    <sc-image
      :media="icon"
      class="uspBarItem__image cell shrink"
    />
    <div class="uspBarItem__text cell auto">
      <sc-text
        tag="h2"
        :field="title"
      />
      <sc-text
        tag="p"
        :field="description"
      />
    </div>
  </sc-link>
  <div
    v-else
    class="uspBarItem grid-x cell small-12 medium-auto large-auto"
    :class="[visibilityClasses, item.active ? '--active' : '']"
  >
    <sc-image
      :media="icon"
      class="uspBarItem__image cell shrink"
    />
    <div class="uspBarItem__text cell auto">
      <sc-text
        tag="h2"
        :field="title"
      />
      <sc-text
        tag="p"
        :field="description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Text as ScText, Image as ScImage, Link as ScLink } from '@sitecore-jss/sitecore-jss-vue'
import { hideElement } from '@/utils/utils'

const props = defineProps({
  item: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const visibilityClasses = hideElement(props?.item?.fields?.Visibility?.value)
const title = { value: props?.item?.fields?.Title?.value }
const description = { value: props?.item?.fields?.Description?.value }
const icon = { value: props?.item?.fields?.Icon?.value }
const isLinkActive: boolean = Boolean(props?.item?.fields?.Link?.value?.href)
</script>

<style scoped lang="scss">
@import 'foundation-sites/scss/foundation';
.uspBarComponent {
  &.--compact,
  &.--piped {
    .uspBarItem {
      img,
      p {
        display: none;
      }

      h2 {
        font-weight: 400;
      }
    }
  }

  &.--piped {
    .uspBarItem {
      text-align: center;
      border-right: 0.063rem solid get-color-var('gray');

      &:last-child {
        border-right: 0;
      }

      @include breakpoint(small only) {
        border-right: 0;
      }
    }
  }

  &.--compact {
    .uspBarItem {
      padding: 0.25rem;

      &::before {
        content: '\2022';
        color: var(--uspBarItemTextColor);
        font-weight: 700;
        padding-left: 0.5rem;
        padding-right: 0.3rem;
      }

      h2 {
        font-size: 0.75rem;
        line-height: 1.5;
        text-shadow: 0 -0.0625rem 0 var(--uspBarBackgroundColor);
      }

      @include breakpoint(small only) {
        h2 {
          font-size: 0.6rem;
        }
      }
    }
  }
}

.uspBarItem {
  @include breakpoint(small only) {
    grid-row-start: 1;
    grid-column-start: 1;
    pointer-events: none;
    opacity: 0;
    transition: 1s ease-in-out;

    &.--active {
      opacity: 1;
    }
  }

  padding: 1rem 0.625rem 1rem 0.625rem;

  &__image {
    width: 4.375rem;
    height: 4.375rem;
    margin: 0 1rem 0 0;
  }

  &__text {
    color: var(--uspBarItemTextColor);
    overflow-wrap: break-word;

    h2 {
      font-size: 0.9rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
    }

    p {
      font-size: 0.7rem;
      font-weight: 400;
      margin: 0.5rem 0 0 0;
    }
  }
}

a {
  color: var(--uspBarItemTextColor);
  text-decoration: none;
}

.cell {
  align-items: center;
}
</style>
