<template>
  <component :is="'script'" type="application/ld+json">
    {{ json }}
  </component>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { GoogleProductFeed } from "./GoogleProductFeed.d";

const props = withDefaults(defineProps<GoogleProductFeed>(), {
  fields: () => ({
    JsonString: {
      value: "",
    },
  }),
});
const json = computed(() => {
  if (typeof window === "undefined") return;
  const hostname = window.location?.origin;
  return props.fields.JsonString.value
    .replace("{server_url}", hostname)
    .replace("\\", "");
});
</script>
