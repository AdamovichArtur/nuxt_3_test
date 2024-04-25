<template>
  <div v-if="showMiniBreadcrumb" class="flex items-center sm:hidden">
    <nuxt-link :to="backLink.href">
      <div>
        <base-icon
          name="chevron-down-light"
          class="w-3 h-3 rotate-90 text-velux-black"
        />
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
</script>
