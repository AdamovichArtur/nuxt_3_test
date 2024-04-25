<template>
  <div class="px-[10px]">
    <div class="mb-8">
      <sc-text tag="h1" :field="pageTitle" data-test-id="page-title" />
    </div>

    <div class="flex sm:gap-8 gap-6 flex-col sm:flex-row">
      <placeholder
        name="accessoryproductpage-left"
        class="sm:w-6/12 mobile:grow"
        :rendering="props.rendering"
      />

      <placeholder
        name="accessoryproductpage-right"
        class="grow"
        :rendering="props.rendering"
      />
    </div>
    <placeholder
      name="accessoryproductpage-bottom"
      :rendering="props.rendering"
    />
  </div>
</template>

<script setup lang="ts">
import { Placeholder, Text as ScText } from "@sitecore-jss/sitecore-jss-vue";
import { computed } from "vue";
import { AccessoryProductPageProps } from "./AccessoryProductPage.d";

const props = withDefaults(defineProps<AccessoryProductPageProps>(), {
  fields: () => ({
    PageTitle: {
      value: "",
    },
  }),
});

const pageTitle = computed(() => get(props, "fields.PageTitle", { value: "" }));
</script>
