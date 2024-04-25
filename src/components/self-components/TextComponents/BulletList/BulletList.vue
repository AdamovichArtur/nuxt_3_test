<template>
  <ul
    class="m-0"
    :class="[
      'mobile:list-inside',
      {
        [bulletStyleVariants[bulletStyle]]: bulletStyle,
        'list-inside': contentInside,
      },
    ]"
  >
    <template v-for="(listItem, index) in bulletList" :key="index">
      <li class="mb-2 text-14">{{ listItem }}</li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BulletListProps } from "./BulletList.d";

const props = withDefaults(defineProps<BulletListProps>(), {
  bulletList: "",
  bulletStyle: "none",
  contentInside: true,
});

const bulletList = computed<string[]>(() => {
  const list = get(props, "bulletList");

  return typeof list === "string"
    ? list.split("\r\n").filter((s) => s !== "")
    : list;
});

const bulletStyleVariants = {
  none: "list-none",
  disc: "list-disc",
  square: "list-square",
  checkmark: "list-checkmark",
  chevron: "list-chevron",
};
</script>
