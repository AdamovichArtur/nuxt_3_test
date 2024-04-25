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

import { layoutServiceFactory } from "@/lib/layout-service-factory";
import { sitePlugin } from "@/lib/site";
import { resolveUrlParams } from "@/utils/resolveUrlParams";
import { useSitecoreJssStore } from "@/stores/sitecore-jss/index";

const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});
const params = props.route;

const jssStore = useSitecoreJssStore();
const { locale } = useI18n();
const { hostname, origin } = useRequestURL();
const { setSitecoreData, setLoading } = jssStore;

const loading = computed(() => jssStore.loading);
const routeData = computed(() => jssStore.routeData);
const notFound = computed(() => !routeData.value);
const sitecoreContext = computed(() => jssStore.sitecoreContext);

const siteContext = sitePlugin.create(hostname);

const { sitecoreRoutePath } = resolveUrlParams(params?.path);
const lang = locale.value || siteContext?.sitecore.context.site.language;
console.log("sitecoreRoutePath", sitecoreRoutePath, lang);
const layoutServiceInstance = layoutServiceFactory.create(siteContext);
setLoading(true);
const { data: result } = await useAsyncData("routeData", () => {
  return layoutServiceInstance.fetchLayoutData(sitecoreRoutePath, lang);
});
console.log("result", lang, result.value);
setSitecoreData(result.value);
</script>
