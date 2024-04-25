<template>
  <not-found v-if="notFound && !loading" :context="sitecoreContext" />
  <route-loading v-else-if="loading" />
  <layout v-else :context="sitecoreContext" :route="routeData" />
</template>

<script setup>
import { computed } from "vue";
import NotFound from "@/NotFound.vue";
import layout from "@/Layout.vue";
import RouteLoading from "@/RouteLoading.vue";

import { useSitecoreJssStore } from "@/stores/sitecore-jss/index";
import { editingDataService } from "@/lib/editing/editing-data-service";

import "@/assets/styles/app.scss";

const jssStore = useSitecoreJssStore();
const cookie = useCookie("previewData");

const { setSitecoreData, setLoading } = jssStore;

const loading = computed(() => jssStore.loading);
const routeData = computed(() => jssStore.routeData);
const notFound = computed(() => !routeData.value);
const sitecoreContext = computed(() => jssStore.sitecoreContext);

setLoading(true);
const { data: result } = await useAsyncData(async () => {
  return editingDataService.getEditingData({ key: cookie._value });
});

console.log("editing Data Service", result.value?.layoutData);
setSitecoreData(result.value?.layoutData);
</script>
