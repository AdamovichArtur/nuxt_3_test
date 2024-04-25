<template>
  <div
    :class="{ 'opacity-20 cursor-not-allowed pointer-events-none': isLoading }"
  >
    <div class="flex flex-col sm:gap-2 gap-1 h-full">
      <div class="flex flex-col sm:gap-2 gap-1">
        <bullet-list
          v-if="hasUspItems"
          :content-inside="false"
          :bullet-list="uspItems"
          bullet-style="checkmark"
          data-equalize-target="productCardUsp"
          data-test-id="usp-component"
        />
      </div>

      <div class="flex items-end mb-4 text-20 mt-4">
        <span class="mr-2">{{ $t("Price") }}</span>
        <i18n-n
          class="block"
          :class="{
            'text-velux-red': hasDiscount,
          }"
          format="currency"
          tag="span"
          :value="productPrice"
          data-test-id="price-component"
        />
      </div>
      <div>
        <vlx-button
          class="productCard__footCtaAddToCart mb-0 mobile:text-left"
          :label="$t('add-to-basket')"
          data-test-id="button-component"
          size="medium"
          style-importance="primary"
          chevron
          :full-width="isMobile"
          @click="addItemToBasket()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useBasketStore } from "@/stores/BasketStore/BasketStore";
import { calculatePrice } from "@/utils/catalogManager";
import useBreakpoints from "@/utils/composables/viewport/useBreakpoints";

import VlxButton from "@/components/self-components/FormComponents/BaseButton/BaseButton.vue";
import BulletList from "@/components/self-components/TextComponents/BulletList/BulletList.vue";

import { ProductCardProps } from "./Product.d";

const props = withDefaults(defineProps<ProductCardProps>(), {
  fields: () => ({
    ProductSetImage: { value: "" },
    ProductSetName: { value: "" },
    ProductCardDescription: { value: "" },
    ProductUspList: { value: [] as string[] },
    ProductPageUrl: null,
    ProductData: {},
    Prices: {},
  }),
});

const basketStore = useBasketStore();
const { isMobile } = useBreakpoints();

const { addToBasket } = basketStore;

const { isLoading } = storeToRefs(basketStore);

const uspItems = computed(() => get(props, "fields.ProductUspList", []));
const hasUspItems = computed(() => uspItems.value.length > 0);

const productData = computed(() => get(props, "fields.ProductData", {}));
const productId = computed(() => get(productData.value, "Id", null));
const productPrices = computed(() => get(props, "fields.Prices", {}));
const productPrice = computed(() =>
  calculatePrice(productPrices.value, basketStore)
);
const hasDiscount = computed(() =>
  get(productPrices.value, "HasDiscount", false)
);

const addItemToBasket = () => {
  addToBasket(productId.value);
};
</script>
