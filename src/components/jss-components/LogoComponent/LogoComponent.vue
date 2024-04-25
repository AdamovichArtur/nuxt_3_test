<template>
  <div class="logoComponent grid-x align-middle" :class="logoLayoutClass">
    <nuxt-link to="/" class="flex">
      <sc-image :media="fields.LogoImage" class="logoComponentImage flex-1" />
      <span class="logoComponentPipepline" :class="logoTextClasses" />
    </nuxt-link>
    <nuxt-link to="/" class="pl-3">
      <sc-text
        tag="span"
        class="logoComponentText"
        :class="logoTextClasses"
        :encode="false"
        :field="wbrLogoText"
      />
      <sc-text
        tag="p"
        class="logoComponentSubText"
        :class="subTextClasses"
        :field="wbrSubText"
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  Image as ScImage,
  Text as ScText,
} from "@sitecore-jss/sitecore-jss-vue";

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {},
  },
});
//constant
const breakpointsClassMap = {
  small: "small-0",
  medium: "medium-0",
  large: "large-0",
};

const logoLayoutClass = computed<string>(() => {
  return props.fields.LogoLayout?.value
    ? "--" + props.fields.LogoLayout?.value
    : "";
});

const logoTextClasses = computed<Array<string>>(() => {
  const breakpointsClasses = get(props, "fields.LogoTextShowFor.value", "");

  return getBreakpointClasses(breakpointsClasses);
});
const subTextClasses = computed<Array<string>>(() => {
  const breakpointsClasses = get(props, "fields.SubTextShowFor.value", "");

  return getBreakpointClasses(breakpointsClasses);
});

const wbrLogoText = { value: addWraps(props?.fields?.LogoText?.value) };
const wbrSubText = { value: addWraps(props?.fields?.SubText?.value) };

function addWraps(inputStr: string) {
  if (inputStr) {
    return inputStr.trim().replaceAll("*", "&shy;").replaceAll("\r\n", "<br>");
  }
}
const getBreakpointClasses = (classList: Array<string>): Array<string> => {
  return reduce(
    breakpointsClassMap,
    (result, value, key) => {
      if (!includes(classList, key)) result.push(value);

      return result;
    },
    []
  );
};
</script>

<style scoped lang="scss">
$logoHeight: 2.5rem;

.logoComponent {
  a {
    color: get-color-var("black");
    text-decoration: none;
  }

  &.--piped {
    .logoComponent {
      margin: 1.2rem 0;
      &Pipepline {
        padding-left: 1rem;
        border-right: get-var("borderVeryThin") solid get-color-var("gray");
      }

      &Text {
        font-weight: 100;
        line-height: $logoHeight;
        white-space: nowrap;
        :deep(br) {
          display: inline;
          content: " ";
          clear: none;
        }
      }

      &SubText {
        display: none; //TODO: Decide if we want to enforce hiding the sub text in the Piped layout
      }
    }
  }
  &.--stacked {
    .logoComponent {
      &Text {
        text-transform: uppercase;
        font-weight: 800;
        line-height: 90%;
        font-size: 1.5rem;
      }

      &SubText {
        margin-top: 0.2rem;
      }
    }
  }
  &.--stacklined {
    .logoComponent {
      &Text {
        text-transform: uppercase;
        font-weight: 800;
        line-height: 90%;
        font-size: 0.9rem;
      }

      &SubText {
        margin-top: 0;
        color: get-color-var("primary");
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: bold;
        margin-top: 0.2rem;
        &::before {
          margin-top: 0.2rem;
          content: "";
          display: block;
          width: 2rem;
          border-top: 0.1rem solid get-color-var("primary");
        }
      }
    }
  }
}

.logoComponent {
  &Image {
    height: calc($logoHeight);
    width: auto;
  }

  &Text {
    font-size: calc($logoHeight / 3);
    margin: 0;
    hyphens: auto;
  }

  &SubText {
    font-size: calc($logoHeight / 5);
    margin: 1rem 0 0 0;
  }
}
</style>
