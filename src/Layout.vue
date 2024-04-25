<template>
  <metainfo>
    <template #title="{ content }">{{ content }}</template>
  </metainfo>
  <div
    :class="'-' + siteSettings.skin"
    class="g-mainWrapper grid-x grid-margin-x"
  >
    <overlay />
    <header-component />
    <main class="m-mainContent">
      <placeholder name="main" :rendering="routeData" />
    </main>
    <footer-component />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";

import { Placeholder } from "@sitecore-jss/sitecore-jss-vue";

import FooterComponent from "@/components/jss-components/FooterComponent/FooterComponent.vue";
import HeaderComponent from "@/components/jss-components/HeaderComponent/HeaderComponent.vue";
import LinkOrModal from "@/components/jss-components/LinkOrModal.vue";
import Overlay from "@/components/jss-components/Overlay/Overlay.vue";

import { windowLoad } from "@/utils/utils";

import { useGlobalStore } from "@/stores/GlobalStore";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";
import "@/assets/styles/app.scss";

const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
  context: {
    type: Object,
    default() {},
  },
});

onMounted(() => {
  windowLoad();

  // useHead({
  //   title: pageTitle.value,
  // });
});
let siteSettings = useGlobalStore();
let basketSettings = useBasketStore();

const routeData = computed(() => get(props, "route"));
const context = computed(() => get(props, "context"));

const siteName = computed<string>(() => get(context.value, "site.name", ""));
const pageTitle = computed<string>(() =>
  get(routeData.value, "fields.PageTitle.value", "Page")
);
console.log(pageTitle.value);
const mainNavigationSettings = computed<any>(() =>
  get(context.value, "siteSettings.MainNavigationSettings", {})
);
const siteSkin = computed<string>(() =>
  toLower(
    get(context.value, "siteSettings.generalSettings.style.value", "wireframe")
  )
);
const myAccountLinks = computed<Array<any>>(() =>
  get(context.value, "siteSettings.MyAccountLinks", [])
);
const showPricesWithVat = computed<boolean>(() =>
  get(context.value, "CheckoutSettings.ShowPricesWithVat", false)
);
const basketPageUrl = computed<string>(() => {
  return get(context.value, "CheckoutSettings.BasketPageUrl", "");
});

const setSiteConfigData = () => {
  siteSettings.setSkin(siteSkin.value);
  siteSettings.setSiteName(siteName.value);
  siteSettings.setMainNavigation(mainNavigationSettings.value);
  siteSettings.setMyAccountLinks(myAccountLinks.value);
  basketSettings.setShowPricesWithVat(showPricesWithVat.value);
  basketSettings.setBasketPageUrl(basketPageUrl.value);
};
setSiteConfigData();
provide("siteSettings", siteSettings);
provide("basketSettings", basketSettings);
provide("routeData", routeData.value);
provide("linkOrModal", LinkOrModal);
</script>

<style scoped lang="scss">
.g-mainWrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0;
  margin: 0;

  > * {
    flex: 1;
    max-width: get-var(siteWidth);
  }
}

.m-mainContent {
  padding: 1rem 0;
  margin-bottom: 2rem;
}
</style>
