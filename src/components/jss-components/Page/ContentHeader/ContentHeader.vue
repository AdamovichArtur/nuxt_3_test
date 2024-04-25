<template>
  <section
    v-if="doesContentExist"
    class="contentHeader"
    data-test-id="section-id"
  >
    <sc-text tag="h1" :field="pageTitle" />
    <sc-text tag="p" :field="pageDescription" />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { Text as ScText } from "@sitecore-jss/sitecore-jss-vue";

const props = defineProps({
  fields: {
    type: Object,
    default: () => {},
  },
  title: {
    type: Object,
    default: () => ({
      value: "",
    }),
  },
  description: {
    type: Object,
    default: () => ({
      value: "",
    }),
  },
});

const pageTitle = computed(() => get(props, "fields.PageTitle", props.title));
const pageDescription = computed(() =>
  get(props, "fields.PageDescription", props.description)
);

const doesContentExist = computed(
  () => pageTitle.value?.value || pageDescription.value?.value
);
</script>
