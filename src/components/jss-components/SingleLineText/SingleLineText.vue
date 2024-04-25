<template>
  <sc-text
    :class="{
      [textAlignVariants[textAlign]]: textAlign,
      [fontWeightVariants[fontWeight]]: fontWeight,
    }"
    :tag="textType"
    :field="labelText"
  />
</template>

<script setup lang="ts">
import ScText from "@/components/sitecore-components/text/ScText.vue";
import { SingleLineTextProps } from "./SingleLineText.d";

const props = withDefaults(defineProps<SingleLineTextProps>(), {
  fields: () => ({
    LabelText: { value: "" },
    TextType: { value: "" },
    TextAlign: { value: "" },
    FontWeight: { value: "" },
  }),
});

const textAlignVariants = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
  Justify: "text-justify",
};

const fontWeightVariants = {
  Light: "font-thin",
  Regular: "font-normal",
  Bold: "font-bold",
};

const labelText = get(props, "fields.LabelText", { value: "" });
const textType = get(props, "fields.TextType.value", "").toLowerCase();
const textAlign = get(props, "fields.TextAlign.value", "");
const fontWeight = get(props, "fields.FontWeight.value", "");
</script>
