<template>
  <div v-if="showMiniBreadcrumb" class="px-[14px] hidden sm:block mb-4">
    <nuxt-link :to="backLink.href">
      <div class="flex items-center">
        <base-icon name="chevron-down-light" class="w-3 h-3 rotate-90" />
        <span v-if="showLink" class="ml-2">
          {{ backLink.text }}
        </span>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/self-components/BaseIcon/BaseIcon.vue";
import { computed } from "vue";
import { MiniBreadcrumbProps } from "./MiniBreadcrumbProps.d";

const props = withDefaults(defineProps<MiniBreadcrumbProps>(), {
  fields: () => ({
    BackLink: {
      value: {
        href: "",
        text: "",
      },
    },
  }),
});

const backLink = computed(() =>
  get(props, "fields.BackLink.value", { href: "", text: "" })
);
const showMiniBreadcrumb = computed(() => !!backLink.value?.href.length);
const showLink = computed(
  () => backLink.value.text && backLink.value.text.trim().length > 0
);
</script>
