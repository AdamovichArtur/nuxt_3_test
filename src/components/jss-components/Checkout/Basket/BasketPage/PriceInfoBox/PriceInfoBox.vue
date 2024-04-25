<template>
  <div class="w-full">
    <div
      class="p-4 bg-velux-background-grey"
      :class="{ 'md:mt-9': isShowHeaders }"
    >
      <sc-text
        class="text-18 sm:text-24 font-semibold mb-6 px-2"
        :field="title"
        data-test-id="title-component"
      />
      <div class="flex flex-col">
        <div class="flex items-center justify-between text-14 sm:text-16 p-2">
          <sc-text :field="subTotal" data-test-id="sub-total-text" />
          <span>
            <i18n-n
              data-test-id="sub-total-sum"
              format="currency"
              tag="span"
              :value="subTotalSum"
            />
          </span>
        </div>
        <div class="flex items-center justify-between text-14 sm:text-16 p-2">
          <sc-text :field="deliveryFee" data-test-id="delivery-text" />
          <span>
            <i18n-n
              data-test-id="delivery-sum"
              format="currency"
              tag="span"
              :value="deliverySum"
            />
          </span>
        </div>
        <div
          v-if="hasFee"
          class="flex items-center justify-between text-14 sm:text-16 p-2"
        >
          <span data-test-id="fee-title"> {{ feeLabel }}</span>
          <span>
            <i18n-n
              data-test-id="fee-sum"
              format="currency"
              tag="span"
              :value="feeSum"
            />
          </span>
        </div>
        <div
          v-if="hasDiscountSum"
          class="flex items-center justify-between text-14 sm:text-16 p-2"
        >
          <sc-text :field="totalDiscount" data-test-id="discount-text" />
          <span class="text-velux-red">
            -
            <i18n-n
              data-test-id="discount-sum"
              format="currency"
              tag="span"
              :value="discountSum"
            />
          </span>
        </div>
        <div class="border-t mt-4 border-branded-secondary border-dashed">
          <div class="border-b py-2 border-branded-secondary">
            <price-info-box-total
              class="p-2 pb-0"
              :total-sum="totalSum"
              data-test-id="total-sum"
            />

            <div
              v-if="showPricesWithVat"
              class="flex items-center justify-between text-14 text-branded-gray p-2 pt-0"
            >
              <sc-text :field="vatText" data-test-id="vat-text" />
              <span>
                <i18n-n
                  data-test-id="vat-sum"
                  format="currency"
                  tag="span"
                  :value="totalVatSum"
                />
              </span>
            </div>
          </div>
        </div>

        <basket-restrictions />

        <price-info-box-actions
          class="mobile:hidden"
          :show-proceed-button="showProceedButton"
          :show-send-enquiry-button="showSendEnquiryButton"
          :send-enquiry-link-text="sendEnquiryLinkText"
          :proceed-button-link-text="proceedButtonLinkText"
          :send-enquiry-link="sendEnquiryLink"
          :proceed-button-link="proceedButtonLink"
        />
        <div class="sm:hidden mt-4">
          <sc-link class="sm:ml-auto underline" :field="continueShoppingLink" />
        </div>
      </div>
    </div>
    <div
      class="hidden mobile:block z-10 fixed w-full bottom-0 px-2 pb-4 bg-white left-0 border-t border-branded-gray"
    >
      <price-info-box-total class="pt-4" :total-sum="totalSum" />

      <price-info-box-actions
        :show-proceed-button="showProceedButton"
        :show-send-enquiry-button="showSendEnquiryButton"
        :is-content-centered="true"
        :send-enquiry-link-text="sendEnquiryLinkText"
        :proceed-button-link-text="proceedButtonLinkText"
        :send-enquiry-link="sendEnquiryLink"
        :proceed-button-link="proceedButtonLink"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import ScText from "@/components/sitecore-components/text/ScText.vue";
import BasketRestrictions from "@/components/jss-components/Checkout/Basket/BasketPage/BasketRestrictions/BasketRestrictions.vue";

import { useBasketStore } from "@/stores/BasketStore/BasketStore";
import { useGlobalStore } from "@/stores/GlobalStore";

import PriceInfoBoxActions from "./components/PriceInfoBoxActions.vue";
import PriceInfoBoxTotal from "./components/PriceInfoBoxTotal.vue";
import { Link as ScLink } from "@sitecore-jss/sitecore-jss-vue";

import { PriceInfoBoxProps, TextField } from "./PriceInfoBox.d";

const props = withDefaults(defineProps<PriceInfoBoxProps>(), {
  fields: () => ({
    DeliveryFeeText: {
      value: "",
    },
    PriceOverviewHeaderText: {
      value: "",
    },
    ProceedButtonLink: {
      value: {
        href: "",
      },
    },
    SubTotalText: {
      value: "",
    },
    TotalCampaignDiscountText: {
      value: "",
    },
    VatText: {
      value: "",
    },
    YouSaveText: {
      value: "",
    },
    SendEnquiryLink: {
      value: {
        href: "",
      },
    },
    continueShoppingLink: {
      value: {
        href: "",
      },
    },
  }),
});
const basketStore = useBasketStore();
const globalStore = useGlobalStore();

const { basket } = basketStore;

const isShowHeaders = computed<boolean>(
  () => globalStore.isShowHeadersProductTable
);
const title = computed<TextField>(() =>
  get(props, "fields.PriceOverviewHeaderText", { value: "" })
);
const subTotal = computed<TextField>(() =>
  get(props, "fields.SubTotalText", { value: "" })
);
const deliveryFee = computed<TextField>(() =>
  get(props, "fields.DeliveryFeeText", { value: "" })
);
const continueShoppingLink = computed<TextField>(() =>
  get(props, "fields.continueShoppingLink", { value: "" })
);

const totalDiscount = computed<TextField>(() =>
  get(props, "fields.TotalCampaignDiscountText", { value: "" })
);
const vatText = computed<TextField>(() =>
  get(props, "fields.VatText", { value: "" })
);

const proceedButtonLinkText = computed<string>(() =>
  get(props, "fields.ProceedButtonLink.value.text", "")
);
const proceedButtonLink = computed<string>(() =>
  get(props, "fields.ProceedButtonLink.value.href", "")
);
const showProceedButton = computed<boolean>(
  () =>
    !!proceedButtonLink.value &&
    !!proceedButtonLinkText.value &&
    basket?.basketRestrictions.length === 0
);

const sendEnquiryLinkText = computed<string>(() =>
  get(props, "fields.SendEnquiryLink.value.text", "")
);
const sendEnquiryLink = computed<string>(() =>
  get(props, "fields.SendEnquiryLink.value.href", "")
);
const showSendEnquiryButton = computed<boolean>(
  () =>
    !!sendEnquiryLink.value &&
    !!sendEnquiryLinkText.value &&
    basket?.basketRestrictions.length > 0
);

const basketPriceConfig = computed(() =>
  get(basketStore, "basket.basketPriceConfig", {})
);
const showPricesWithVat = computed(() => basketStore.showPricesWithVat);

const feeLabel = computed<string>(() =>
  get(basketPriceConfig.value, "AdditionalFeeGeneralLabel", "")
);
const subTotalSumWithVat = computed<number>(() =>
  get(basketPriceConfig.value, "ProductsPrice.PriceWithVat", 0)
);
const subTotalSumWithoutVat = computed<number>(() =>
  get(basketPriceConfig.value, "ProductsPrice.PriceExVat", 0)
);
const subTotalSum = computed<number>(() =>
  showPricesWithVat.value
    ? subTotalSumWithVat.value
    : subTotalSumWithoutVat.value
);
const deliverySum = computed<number>(() =>
  get(basketPriceConfig.value, "TotalDeliveryFee.PriceWithVat", 0)
);
const discountedPriceWithVat = computed<number>(() =>
  get(basketPriceConfig.value, "ProductsPrice.DiscountedPriceWithVat", 0)
);
const discountedPriceExVat = computed<number>(() =>
  get(basketPriceConfig.value, "ProductsPrice.DiscountedPriceExVat", 0)
);
const discountedPrice = computed<number>(() =>
  showPricesWithVat.value
    ? discountedPriceWithVat.value
    : discountedPriceExVat.value
);
const feeSum = computed<number>(() => basketStore.getBasketFee);
const hasDiscount = computed<boolean>(() =>
  get(basketPriceConfig.value, "ProductsPrice.HasDiscount", false)
);
const discountSum = computed<number>(() => {
  if (hasDiscount.value) {
    return subTotalSum.value - discountedPrice.value;
  }

  return 0;
});

const totalSum = computed<number>(() => {
  if (hasDiscount.value) {
    return discountedPrice.value + deliverySum.value;
  }

  return subTotalSum.value + deliverySum.value + feeSum.value;
});

const totalVatSum = computed<number>(() => {
  const priceVat = get(basketPriceConfig.value, "TotalPrice.PriceVat", 0);
  const deliveryVat = get(
    basketPriceConfig.value,
    "TotalDeliveryFee.PriceVat",
    0
  );

  return priceVat + deliveryVat;
});

const hasFee = computed<boolean>(() => !(feeSum.value === 0));
const hasDiscountSum = computed<boolean>(() => !(discountSum.value === 0));
</script>
