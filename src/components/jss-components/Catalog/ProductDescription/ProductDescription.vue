<template>
  <sc-rich-text
    class="p-4 mt-4 bg-velux-background-grey"
    :field="description"
    tag="div"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import ScRichText from "@/components/sitecore-components/rich-text/ScRichText.vue";

import { ProductDescriptionProps } from "./ProductDescription.d";

const props = withDefaults(defineProps<ProductDescriptionProps>(), {
  fields: () => ({
    PageTitle: {
      value: "",
    },
  }),
});

const description = computed(() =>
  get(props, "fields.Description", { value: "" })
);
</script>
