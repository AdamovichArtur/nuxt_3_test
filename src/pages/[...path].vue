<template>
  <page :route="route" />
</template>

<script setup>
import page from "@/layout/Default.vue";
const route = useRoute().params;
</script>
