<template>
  <section v-if="showComponent" data-test-id="upsell-component-id">
    <div>
      <sc-text tag="h4" :field="componentHeader" />
      <div
        v-equalize
        class="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4"
      >
        <template v-for="product in relatedProducts" :key="product?.Id">
          <product-card
            data-test-id="product-card-id"
            :enable-add-to-cart="product.ShowAddToBasket"
            :enable-more-info="!product.ShowAddToBasket"
            :enable-image-link="!product.ShowAddToBasket"
            :product="product"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { UpsellProps } from "./Upsell.d";
import { Product } from "./UpsellResponse.d";

import { dataFetcher } from "@/dataFetcher";
import CATALOG from "@/constants/catalogConstants";
import { useGlobalStore } from "@/stores/GlobalStore";
import { replaceTokensInString } from "@/utils/stringUtils";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";

import ProductCard from "../ProductCard/ProductCard.vue";
import { Text as ScText } from "@sitecore-jss/sitecore-jss-vue";

const basketStore = useBasketStore();
const globalStore = useGlobalStore();

const props = withDefaults(defineProps<UpsellProps>(), {
  fields: () => ({
    ComponentHeader: {
      value: "",
    },
    MaxNumberOfRelatedProducts: {
      value: 1,
    },
    PicassoRelationType: {
      value: "",
    },
  }),
});

onMounted(async () => {
  if (basketStore.basketId === null) {
    showComponent.value = false;

    return;
  }

  try {
    const requestUrl = getRelatedProductsUrl();
    const response = await dataFetcher<Product[]>(requestUrl);
    relatedProducts.value = response;

    if (relatedProducts.value.length === 0) {
      showComponent.value = false;
    }
  } catch (error) {
    console.error("Error getting related products:", error);

    showComponent.value = false;
  }
});

const relatedProducts = ref<Product[]>([]);
const showComponent = ref(true);

const componentHeader = computed(() =>
  get(props, "fields.ComponentHeader", { value: "" })
);

const maxNumberOfRelatedProducts = computed(() =>
  get(props, "fields.MaxNumberOfRelatedProducts.value", { value: 4 })
);

const picassoRelationType = computed(() =>
  get(props, "fields.PicassoRelationType.value", { value: "BASKET" })
);

const getRelatedProductsUrl = (): string => {
  const tokens = {
    SHOPNAME: globalStore.siteName,
    BASKET_ID: basketStore.basketId,
    MAX_NUMBER_OF_RELATED_PRODUCTS: maxNumberOfRelatedProducts.value.toString(),
    RELATION_TYPE: picassoRelationType.value.toString(),
  };

  return replaceTokensInString(CATALOG.API.GET_RELATED_PRODUCTS, tokens);
};
</script>
