<template>
  <div class="flex flex-col">
    <template
      v-for="(product, productLineId, productItemIndex) in groupedProductItems"
      :key="productLineId"
    >
      <product-overview-item
        :ref="setProductOverviewItemRef(productLineId)"
        class="transition-opacity duration-300"
        data-test-id="product-overview-item-id"
        :class="{
          'opacity-20 cursor-not-allowed pointer-events-none': isLoading,
        }"
        :product-title="product?.Name"
        :product-id="product?.ProductId"
        :product-line-id="productLineId"
        :product-image="product?.ProductImageSet?.InsideViewUrl"
        :product-quantity="product?.Quantity"
        :product-subtotal="getProductSubtotal(product?.SumPrice)"
        :product-attributes="product?.Attributes"
        :product-additional-fee="product?.AdditionalFee"
        :product-additional-fee-label="product?.AdditionalFeeId"
        :product-picasso-messages="product?.Messages"
        :show-column-titles="isFirstItem(productItemIndex) && showHeaders.value"
        :is-first-item="isFirstItem(productItemIndex)"
        @add-product="addProduct"
        @remove-product="removeProduct"
        @remove-all-products="openRemoveDialog"
      />
    </template>
    <base-bottom-bar
      v-if="isMobile"
      v-model="isRemoveDialogOpened"
      data-test-id="base-bottom-bar-id"
    >
      <div>
        <div class="border-b border-current">
          <vlx-button
            class="py-4"
            :label="$t('remove-basket')"
            text-only
            full-width
            :is-bottom-indent="false"
            :is-padding="false"
            data-test-id="remove-all-products-base-bottom-bar-button-id"
            @click="removeAllProducts"
          />
        </div>
        <vlx-button
          class="py-4"
          :label="$t('cancel')"
          text-only
          full-width
          :is-bottom-indent="false"
          :is-padding="false"
          data-test-id="close-base-bottom-bar-button-id"
          @click="closeRemoveDialog"
        />
      </div>
    </base-bottom-bar>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { getBasketCookie } from "@/utils/composables/cookieManager";
import { dataFetcher } from "@/dataFetcher";
import { useGlobalStore } from "@/stores/GlobalStore";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";
import { replaceTokensInString } from "@/utils/stringUtils";
import useBreakpoints from "@/utils/composables/viewport/useBreakpoints";

import BASKET from "@/constants/basketConstants";
import ProductOverviewItem from "./components/ProductOverviewItem/ProductOverviewItem.vue";
import BaseBottomBar from "@/components/self-components/BaseBottomBar/BaseBottomBar.vue";
import VlxButton from "@/components/self-components/FormComponents/BaseButton/BaseButton.vue";

import {
  ProductOverviewItemProps,
  GroupedProductItemsProps,
  ProductApiProps,
  ProductBasketItemsProps,
} from "./ProductOverview.d";

import { SumPriceProps } from "../BasketPage/BasketPage.d";

const globalStore = useGlobalStore();
const basketStore = useBasketStore();

const props = withDefaults(defineProps<ProductOverviewItemProps>(), {
  fields: () => ({
    ShowHeaders: {
      value: true,
    },
  }),
  rendering: () => ({
    componentName: "ProductOverview",
  }),
});

const { updateBasketState, getPrice, setLoading } = basketStore;
const { isMobile } = useBreakpoints();

const productOverviewItemRefs = reactive({});
let removeItemObject = reactive<ProductApiProps>({
  productLineId: "",
  quantity: 0,
});
const isRemoveDialogOpened = ref(false);

const productItems = computed<ProductBasketItemsProps>(
  () => basketStore.basket || { items: [] }
);
const showPricesWithVat = computed<Boolean>(
  () => basketStore.showPricesWithVat
);

const isLoading = computed<Boolean>(() => basketStore.isLoading);
const groupedProductItems = computed<GroupedProductItemsProps>(() => {
  return productItems.value.items.reduce((acc, it) => {
    acc[it.LineId] = it;

    return acc;
  }, {} as GroupedProductItemsProps);
});

const showHeaders = computed(() => get(props, "fields.ShowHeaders"));

const setProductOverviewItemRef = (productLineId: string) => {
  return (el) => {
    productOverviewItemRefs[productLineId] = el;
  };
};

const addProduct = ({ productLineId, quantity }: ProductApiProps) => {
  handleApiProductRequests(
    productLineId,
    quantity,
    "Add product to basket error message: "
  );
};

const closeRemoveDialog = () => {
  isRemoveDialogOpened.value = false;
};

const removeProduct = ({ productLineId, quantity }: ProductApiProps) => {
  handleApiProductRequests(
    productLineId,
    quantity,
    "Remove product from basket error message: "
  );
};

const openRemoveDialog = ({ productLineId, quantity }: ProductApiProps) => {
  removeItemObject = { productLineId, quantity };

  if (isMobile.value) {
    isRemoveDialogOpened.value = true;

    return;
  }

  removeAllProducts();
};

const removeAllProducts = () => {
  if (!removeItemObject.productLineId.length) return;

  handleApiProductRequests(
    removeItemObject.productLineId,
    removeItemObject.quantity,
    "Add product to basket error message: "
  );

  isRemoveDialogOpened.value = false;

  if (!productItems.value.items.length) {
    deleteBasket();
  }
};

const getRequestUrl = (url: string): string => {
  const tokens = {
    SHOPNAME: globalStore.siteName,
    BASKET_ID: getBasketId(),
  };

  return replaceTokensInString(url, tokens);
};

const handleApiProductRequests = async (
  productLineId: string,
  quantity: number,
  logMessage: string
) => {
  try {
    const basketId = getBasketId();

    if (!basketId) return;
    setLoading(true);
    const requestUrl = getRequestUrl(BASKET.API.UPDATE_PRODUCT_QUANTITY);

    const response = await dataFetcher(requestUrl, {
      BasketLineId: productLineId,
      Quantity: quantity,
    });

    updateBasketState(response);
  } catch (err) {
    console.error(logMessage, err.message);
  } finally {
    setLoading(false);
  }
};

const deleteBasket = async () => {
  try {
    const basketId = getBasketId();

    if (!basketId) return;
    setLoading(true);
    const requestUrl = getRequestUrl(BASKET.API.DELETE_BASKET);

    await dataFetcher(requestUrl);
  } catch (err) {
    console.error("Delete bakset error message: ", err.message);
  } finally {
    setLoading(false);
  }
};

const getBasketId = (): string | undefined => {
  const basketCookieData = getBasketCookie("basket");

  if (!basketCookieData?.basketId) {
    console.error("Basket id has been missed");

    return;
  }

  return basketCookieData.basketId;
};

const getProductSubtotal = (priceConfig: SumPriceProps): any => {
  if (!priceConfig) return;

  const {
    PriceWithVat,
    PriceExVat,
    HasDiscount,
    DiscountedPriceWithVat,
    DiscountedPriceExVat,
  } = priceConfig;

  const productPriceWithoutDiscount = showPricesWithVat.value
    ? PriceWithVat
    : PriceExVat;
  const discountedProductPrice = showPricesWithVat.value
    ? DiscountedPriceWithVat
    : DiscountedPriceExVat;

  const finalProductPrice = getPrice(
    HasDiscount,
    productPriceWithoutDiscount,
    discountedProductPrice
  );

  const subtotalProductPrice = parseFloat(
    finalProductPrice?.toFixed(2).replace(/\.?0+$/, "")
  );

  return {
    subtotalProductPrice,
    subtotalProductPriceWithoutDiscount: HasDiscount
      ? productPriceWithoutDiscount
      : null,
  };
};

const isFirstItem = (productItemIndex) => {
  return productItemIndex === 0;
};

onMounted(() => {
  globalStore.setShowHeadersProductTable(showHeaders.value.value);
});
</script>
