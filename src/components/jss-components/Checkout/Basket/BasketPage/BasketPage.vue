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
        <sc-link
          class="sm:ml-auto hidden sm:inline-block text-velux-splash-blue"
          :field="continueShoppingLink"
        />
      </div>
    </div>
    <div v-if="isLoading" class="text-center">
      <loader />
    </div>
    <div v-if="hasBasketItems && !isLoading" class="flex flex-col">
      <placeholder name="basketpage" :rendering="props.rendering">
        <template #default="{ components }">
          <div
            v-if="!isLoading"
            class="flex flex-col md:flex-row md:gap-8 gap-6 items-start"
          >
            <div class="flex-1 flex flex-col md:gap-8 gap-6">
              <div class="order-1 md:order-none">
                <component
                  :is="
                    getComponent(
                      components,
                      excludedComponentNameList.productOverviewComponentName
                    )
                  "
                />
              </div>
              <div v-if="!isDesktopDevice" class="order-2 md:order-none">
                <component
                  :is="
                    getComponent(
                      components,
                      excludedComponentNameList.expectedDeliveryComponentName
                    )
                  "
                />
              </div>
              <div v-if="!isDesktopDevice" class="order-6 md:order-none">
                <component
                  :is="
                    getComponent(
                      components,
                      excludedComponentNameList.priceInfoBoxComponentName
                    )
                  "
                />
              </div>
              <template
                v-for="(component, index) in getComponentsWithoutExcluded(
                  components
                )"
                :key="index"
              >
                <div
                  v-if="!isLoading"
                  :ref="
                    component.$props.rendering.componentName === 'PriceInfoBox'
                      ? 'priceOverviewComponent'
                      : ''
                  "
                  :class="getClassName(component, index)"
                >
                  <component :is="component" />
                </div>
              </template>
            </div>

            <div
              v-if="isDesktopDevice"
              class="md:sticky top-0 z-2 flex flex-col basis-4/12"
            >
              <component
                :is="
                  getComponent(
                    components,
                    excludedComponentNameList.priceInfoBoxComponentName
                  )
                "
              />
              <component
                :is="
                  getComponent(
                    components,
                    excludedComponentNameList.expectedDeliveryComponentName
                  )
                "
                class="mt-4"
              />
            </div>
          </div>
        </template>
      </placeholder>
    </div>
    <div v-else-if="!hasBasketItems && !isLoading" class="text-center">
      <sc-text tag="span" :field="basketEmptyText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { getBasketCookie } from "@/utils/composables/cookieManager";
import { replaceTokensInString } from "@/utils/stringUtils";

import BASKET from "@/constants/basketConstants";

import { Link as ScLink } from "@sitecore-jss/sitecore-jss-vue";
import { Placeholder } from "@sitecore-jss/sitecore-jss-vue";
import ScText from "@/components/sitecore-components/text/ScText.vue";
import Loader from "@/components/self-components/Loader/Loader.vue";

import { BasketPageProps, BasketDataApi } from "./BasketPage.d";

import { dataFetcher } from "@/dataFetcher";

import useBreakpoints from "@/utils/composables/viewport/useBreakpoints";

import { useGlobalStore } from "@/stores/GlobalStore";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";

const globalStore = useGlobalStore();
const basketStore = useBasketStore();

const props = withDefaults(defineProps<BasketPageProps>(), {
  fields: () => ({
    PageTitle: {
      value: "",
    },
    ContinueShoppingLink: {
      value: {
        href: "",
      },
    },
    BasketEmptyText: {
      value: "",
    },
  }),
});

const { isDesktopDevice } = useBreakpoints();

const excludedComponentNameList = {
  expectedDeliveryComponentName: "ExpectedDelivery",
  productOverviewComponentName: "ProductOverview",
  priceInfoBoxComponentName: "PriceInfoBox",
};

const VoucherComponentName = "Voucher";

onMounted(() => {
  getBasketData();
});

const { updateBasketState } = basketStore;
const isLoading = ref(false);

const pageTitle = computed(() => get(props, "fields.PageTitle", { value: "" }));
const doesPageTitleExist = computed(() => !!pageTitle.value?.value.length);
const continueShoppingLink = computed(() =>
  get(props, "fields.ContinueShoppingLink", { value: "" })
);
const basketEmptyText = computed(() =>
  get(props, "fields.BasketEmptyText", { value: "" })
);
const basketItems = computed(() => get(basketStore, "basket.items", []));
const hasBasketItems = computed(() => basketItems.value.length);

const getComponent = (components, name) => {
  const expectedComponent = components.find(
    ({ $props }) => $props.rendering?.componentName === name
  );

  if (name === excludedComponentNameList.priceInfoBoxComponentName) {
    expectedComponent.$props.fields = {
      ...expectedComponent.$props.fields,
      continueShoppingLink: continueShoppingLink.value,
    };
  }

  return expectedComponent;
};

const getClassName = ({ $props }, index: number) => {
  const componentName = get($props, "rendering.componentName", "");
  return [
    `order-${
      componentName === VoucherComponentName ? 5 : index + 4
    } md:order-none`,
  ];
};

const getComponentsWithoutExcluded = (components) => {
  const excludedComponentNames = new Set(
    Object.values(excludedComponentNameList)
  );

  return components.filter(
    ({ $props }) => !excludedComponentNames.has($props.rendering?.componentName)
  );
};

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
