<template>
  <div class="flex flex-col border border-velux-light-grey p-4">
    <div class="flex flex-col">
      <component
        :is="imageDomElementWrapper"
        class="m-auto"
        :href="imageHrefData"
        data-test-id="link-component"
      >
        <sc-image
          class="max-w-[250px]"
          data-test-id="image-component"
          :media="product?.ProductSetImage"
        />
      </component>
      <div class="mt-3 mb-11" data-equalize-target="productCardHead">
        <sc-text
          tag="h3"
          class="text-16 m-0"
          :field="productTitle"
          data-test-id="title-component"
          :editable="false"
        />
        <sc-rich-text
          v-if="isListingPage"
          class="mt-2 mb-0 inline-block text-14"
          tag="p"
          :field="productDescription"
          data-test-id="description-component"
        />
      </div>
    </div>

    <div
      v-if="product?.USPItems?.value?.length"
      :class="[USPListVisibilityClasses]"
      class="mb-5"
    >
      <bullet-list
        bullet-style="checkmark"
        data-equalize-target="productCardUsp"
        data-test-id="card-component"
        :bullet-list="product?.USPItems?.value"
      />
    </div>
    <div
      class="flex gap-3 mt-auto"
      :class="{
        'flex-row justify-between flex-wrap': !enableAddToCart,
        'flex-col': enableAddToCart,
      }"
    >
      <vlx-button
        v-if="(product?.ProductPageUrl || !isListingPage) && enableMoreInfo"
        class="text-nowrap"
        :class="{
          'text-right ml-auto': enableAddToCart,
          'order-1': !enableAddToCart,
        }"
        :label="$t('more-info')"
        :link-url="product?.ProductPageUrl || categoryPageUrl"
        size="small"
        :is-bottom-indent="false"
        :text-only="enableAddToCart"
        :chevron="enableAddToCart"
        data-test-id="more-button-component"
      />
      <div class="flex justify-between flex-wrap gap-3">
        <i18n-n
          format="currency"
          tag="span"
          :class="{
            'text-velux-red': hasDiscount,
          }"
          :value="productPrice"
          data-test-id="price-component"
        />

        <vlx-button
          v-if="enableAddToCart"
          class="text-nowrap"
          :label="$t('add-to-basket')"
          size="small"
          :is-bottom-indent="false"
          data-test-id="button-component"
          @click="addToBasket(productId)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";
import { calculatePrice } from "@/utils/catalogManager";

import {
  RichText as ScRichText,
  Text as ScText,
} from "@sitecore-jss/sitecore-jss-vue";
import ScImage from "@/components/sitecore-components/image/ScImage.vue";
import VlxButton from "@/components/self-components/FormComponents/BaseButton/BaseButton.vue";
import BulletList from "@/components/self-components/TextComponents/BulletList/BulletList.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {},
  },
  enableAddToCart: {
    type: Boolean,
    default: false,
  },
  enableMoreInfo: {
    type: Boolean,
    default: true,
  },
  enableImageLink: {
    type: Boolean,
    default: true,
  },
});

let basketStore = useBasketStore();

const enableMoreInfo = props.enableMoreInfo;
const enableImageLink = props.enableImageLink;

const categoryPageUrl = inject("categoryPageUrl", "");
const isListingPage: boolean = inject("isListingPage", false);
const USPListVisibilityClasses = inject("USPListVisibilityClasses", "");

const imageDomElementWrapper = computed(() =>
  isListingPage || !enableImageLink ? "div" : "a"
);

const imageHrefData = computed(() =>
  isListingPage ? null : props?.product?.ProductPageUrl || categoryPageUrl
);

const product = computed(() => get(props, "product", {}));
const productTitle = computed(
  () => props?.product?.ProductSetName || { value: props.product.Title }
);
const productDescription = computed(
  () => props?.product?.ProductCardDescription || { value: "" }
);
const productId = computed(
  () => props?.product?.ProductData?.Id || props?.product?.Id
);
const hasDiscount = computed(() => get(product.value, "Prices.HasDiscount"));
const productPrice = computed(() => {
  const productPrices = props?.product?.Prices;

  return calculatePrice(productPrices, basketStore);
});

const addToBasket = (productId) => {
  basketStore.addToBasket(productId);
};
</script>
