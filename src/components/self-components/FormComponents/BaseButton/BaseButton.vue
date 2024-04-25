<template>
  <component
    :is="domElement"
    :href="linkUrl"
    :type="getComponentType"
    :disabled="disabled"
    :value="getComponentValue"
    class="inline-block transition duration-250 ease-in-out"
    :class="getComponentClasses"
    data-test-id="base-button-id"
  >
    <div
      v-if="domElement !== ELEMENT_TYPES.input"
      class="flex items-center"
      :class="betweenContent ? 'justify-between' : 'justify-center'"
    >
      <slot name="icon-before-label" />
      <sc-text tag="span" :field="{ value: label }" />
      <base-icon
        v-if="chevron"
        name="chevron-down-light"
        :class="getIconClasses"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BaseButtonProps } from "./BaseButton.d";

import BaseIcon from "@/components/self-components/BaseIcon/BaseIcon.vue";
import ScText from "@/components/sitecore-components/text/ScText.vue";

const props = withDefaults(defineProps<BaseButtonProps>(), {
  linkUrl: undefined,
  element: "button",
  label: "Button label",
  chevron: false,
  betweenContent: false,
  chevronDirection: "right",
  chevronPosition: "right",
  styleImportance: "secondary",
  size: "medium",
  disabled: false,
  buttonType: "button",
  fullWidth: false,
  textOnly: false,
  isBottomIndent: true,
  isPadding: true,
});

const ELEMENT_TYPES = {
  input: "input",
  button: "button",
  link: "a",
};
const domElement = computed<string>(() => {
  return props.linkUrl ? ELEMENT_TYPES.link : ELEMENT_TYPES.button;
});

const label = computed(() => get(props, "label", ""));
const betweenContent = computed(() => get(props, "betweenContent", false));
const chevronDirection = computed(() => get(props, "chevronDirection", ""));
const chevronPosition = computed(() => get(props, "chevronPosition", ""));
const styleImportance = computed(() => get(props, "styleImportance", ""));
const size = computed(() => get(props, "size", ""));
const disabled = computed(() => get(props, "disabled", false));
const buttonType = computed(() => get(props, "buttonType", ""));
const fullWidth = computed(() => get(props, "fullWidth", false));
const textOnly = computed(() => get(props, "textOnly", false));
const isBottomIndent = computed(() => get(props, "isBottomIndent", false));
const isPadding = computed(() => get(props, "isPadding", false));
const getComponentType = computed(() => {
  return domElement.value === ELEMENT_TYPES.button ||
    domElement.value === ELEMENT_TYPES.input
    ? buttonType.value
    : null;
});
const getComponentValue = computed(() => {
  return domElement.value === ELEMENT_TYPES.input ? label.value : null;
});

const getComponentClasses = computed<string>(() => {
  let styleClasses: string = "";

  if (textOnly.value) {
    styleClasses += "hover:underline ";
  } else {
    switch (styleImportance.value) {
      case "primary":
        styleClasses +=
          "text-velux-white bg-velux-red hover:bg-velux-black hover:text-velux-white ";
        break;
      case "tertiary":
        styleClasses +=
          "text-velux-black bg-velux-light-grey hover:bg-velux-light-grey ";
        break;
      case "secondary":
      default:
        styleClasses +=
          "text-velux-white bg-velux-blue hover:bg-velux-red hover:text-velux-white ";
        break;
    }
  }

  const { value: isPaddingValue } = isPadding;

  switch (size.value) {
    case "small":
      styleClasses += "text-xs ";
      if (isPaddingValue) styleClasses += "py-1.5 px-3 ";
      break;
    case "large":
      styleClasses += "text-lg ";
      if (isPaddingValue) styleClasses += "py-2.5 px-5 ";
      break;
    case "medium":
    default:
      if (isPaddingValue) styleClasses += "py-2 px-4 ";
      break;
  }

  if (isBottomIndent.value) styleClasses += "mb-6 ";
  styleClasses += disabled.value
    ? "opacity-30 cursor-not-allowed "
    : "cursor-pointer ";
  if (fullWidth.value) styleClasses += "w-full ";

  return styleClasses;
});

const getIconClasses = computed<string>(() => {
  let styleClasses: string = "";

  switch (size.value) {
    case "small":
      styleClasses += "w-3 h-3 ";
      break;
    case "large":
      styleClasses += "w-5 h-5 ";
      break;
    case "medium":
    default:
      styleClasses += "w-4 h-4 ";
      break;
  }

  switch (chevronDirection.value) {
    case "up":
      styleClasses += "rotate-180 ";
      break;
    case "left":
      styleClasses += "rotate-90 ";
      break;
    case "right":
      styleClasses += "-rotate-90 ";
      break;
    case "down":
    default:
      styleClasses += "";
      break;
  }

  styleClasses += chevronPosition.value == "right" ? "ml-2 " : "mr-2 -order-1 ";

  return styleClasses;
});
</script>
