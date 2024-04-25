<template>
  <div class="px-[10px]">
    <div
      :class="{
        'mb-0 sm:mb-8': !doesPageTitleExist,
        'mb-8': doesPageTitleExist,
      }"
    >
      <div class="flex mobile:flex-col sm:justify-between sm:items-end">
        <sc-text tag="h1" class="mb-0" :field="pageTitle" />
      </div>
    </div>
    <div v-if="isLoading" class="text-center">
      <loader />
    </div>
    <div />
    <div v-if="hasBasketItems && !isLoading" class="flex flex-col">
      <placeholder name="addresspage" :rendering="props.rendering" />
    </div>
    <div v-else-if="!hasBasketItems && !isLoading" class="text-center">
      <span>Basket is empty</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { getBasketCookie } from "@/utils/composables/cookieManager";
import { replaceTokensInString } from "@/utils/stringUtils";

import BASKET from "@/constants/basketConstants";

import { Placeholder } from "@sitecore-jss/sitecore-jss-vue";
import ScText from "@/components/sitecore-components/text/ScText.vue";
import Loader from "@/components/self-components/Loader/Loader.vue";

import { AddressPageProps } from "./AddressPage.d";

import { BasketDataApi } from "../BasketPage/BasketPage.d";
import { dataFetcher } from "@/dataFetcher";

import { useGlobalStore } from "@/stores/GlobalStore";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";

const globalStore = useGlobalStore();
const basketStore = useBasketStore();

const props = withDefaults(defineProps<AddressPageProps>(), {
  fields: () => ({
    PageTitle: {
      value: "",
    },
    BackLink: {
      value: {
        href: "",
      },
    },
  }),
});

onMounted(() => {
  getBasketData();
});

const { updateBasketState } = basketStore;
const isLoading = ref(false);

const pageTitle = computed(() => get(props, "fields.PageTitle", { value: "" }));
const doesPageTitleExist = computed(() => !!pageTitle.value?.value.length);
const backLink = computed(() => get(props, "fields.BackLink", { value: "" }));
const basketItems = computed(() => get(basketStore, "basket.items", []));
const hasBasketItems = computed(() => basketItems.value.length);

const getBasketUrl = (url: string, basketId: string): string => {
  const tokens = {
    SHOPNAME: globalStore.siteName,
    BASKET_ID: basketId,
  };

  return replaceTokensInString(url, tokens);
};

const getBasketData = async () => {
  const basketCookieData = getBasketCookie("basket");

  if (!basketCookieData?.basketId) {
    console.info("Basket id is empty");

    return;
  }

  try {
    isLoading.value = true;

    const requestUrl = getBasketUrl(
      BASKET.API.GET_BASKET,
      basketCookieData?.basketId
    );

    const response = await dataFetcher<BasketDataApi>(requestUrl);

    updateBasketState(response);
  } catch (err) {
    console.error("Getting basket data error message: ", err.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
