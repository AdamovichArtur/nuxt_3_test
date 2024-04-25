<template>
  <nuxt-link
    class="flex gap-3 items-center text-black pl-0 sm:pl-4 sm:border-l sm:border-velux-light-grey sm:border-solid ml-4"
    :to="basketPageUrl"
  >
    <div
      class="basket sm:w-11 sm:h-11 w-9 h-9 rounded-full bg-velux-red relative flex justify-center items-center text-white"
    >
      <div
        class="absolute sm:left-7 sm:-top-2 sm:w-5 sm:h-5 w-4 h-4 left-6 -top-1 border border-velux-red rounded-full flex justify-center items-center bg-white sm:leading-[23px] leading-6"
      >
        <sc-text
          class="text-velux-red sm:font-600 sm:text-16 text-11 font-300"
          tag="span"
          :field="{ value: basketSize }"
        />
      </div>
      <base-icon name="basket-icon" class="sm:w-7 sm:h-7 w-5 h-5" />
    </div>
    <div v-if="showPrices" class="sm:block hidden" data-test-id="prices-block">
      <i18n-n format="currency" tag="span" :value="basketTotal" />
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import { useBasketStore } from "@/stores/BasketStore/BasketStore";
import { computed } from "vue";
import { MiniBasketProps } from "./MiniBasket.d";

import BaseIcon from "@/components/self-components/BaseIcon/BaseIcon.vue";
import ScText from "@/components/sitecore-components/text/ScText.vue";

const basketStore = useBasketStore();

const props = withDefaults(defineProps<MiniBasketProps>(), {
  fields: () => ({
    ShowPrices: {
      value: true,
    },
  }),
});

const showPrices = get(props, "fields.ShowPrices.value");

const basketPageUrl = computed(() => basketStore.basketPageUrl);
const basketSize = computed(() => basketStore.basketSize);
const basketTotal = computed(() => basketStore.basketTotal);
</script>
