<template>
  <div class="grid sm:grid-cols-[3fr_1fr_1fr] grid-cols-1 border-branded-gray">
    <div>
      <span
        v-if="showColumnTitles"
        class="sm:block hidden pb-3"
        data-test-id="column-title-id"
      >
        {{ $t('Product') }}
      </span>
      <div
        class="flex border border-branded-gray"
        :class="{ 'border-t-0': !isFirstItem }"
      >
        <div class="max-w-[130px] sm:max-w-[150px] w-full border-r p-4 flex-1">
          <sc-image
            aspect-ratio="1:1"
            :media="{
              src: productImage,
              alt: 'Velux product'
            }"
          />
        </div>
        <div class="flex flex-col sm:gap-2 gap-1 justify-between p-4 flex-1">
          <div class="flex flex-col">
            <product-overview-info
              :product-title="productTitle"
              :product-id="productId"
              :product-attributes="productAttributes"
            />
          </div>

          <base-counter
            v-model="productItemQuantity"
            class="sm:hidden block mt-3 sm:mt-0"
            :min-value="1"
          />

          <div
            v-if="productPicassoMessages.length"
            class="flex flex-col gap-3 mt-5 sm:mt-0"
            data-test-id="picasso-messages-wrapper-id"
          >
            <template
              v-for="message in productPicassoMessages"
              :key="message.Id"
            >
              <div
                v-if="message.IsActive"
                class="flex flex-row items-baseline"
                data-test-id="picasso-message-item-id"
              >
                <span class="w-2 h-2 sm:w-3 sm:h-3 border rounded-full bg-velux-yellow mr-2" />
                <sc-text
                  class="text-12 sm:text-16 text-velux-grey flex-1"
                  :field="{
                    value: message.Description
                  }"
                />
              </div>
            </template>
          </div>
          <div
            v-if="doesContributionFeeExist"
            class="order-1 sm:order-none flex gap-x-5 flex-wrap font-semibold"
            data-test-id="contribution-fee-wrapper-id"
          >
            <sc-text
              class="sm:whitespace-nowrap text-14 sm:text-16"
              :field="{
                value: productAdditionalFeeLabel
              }"
            />

            <i18n-n
              class="sm:hidden inline text-14 sm:text-16"
              format="currency"
              tag="span"
              :value="productAdditionalFee"
            />
          </div>
          <div class="sm:hidden flex gap-x-5 mt-3 sm:mt-0 flex-wrap">
            <span class="text-14 sm:text-16 font-560">
              {{ $t('subtotal') }}
            </span>
            <div class="flex flex-col gap-1 mobile:flex-wrap">
              <i18n-n
                v-if="productSubtotal.subtotalProductPriceWithoutDiscount"
                class="text-12 sm:text-14 font-560 line-through"
                format="currency"
                tag="span"
                :value="productSubtotal.subtotalProductPriceWithoutDiscount"
              />
              <i18n-n
                class="text-14 sm:text-16 font-560"
                :class="{
                  'text-velux-red': productSubtotal.subtotalProductPriceWithoutDiscount
                }"
                format="currency"
                tag="span"
                :value="productSubtotal.subtotalProductPrice"
              />
            </div>
          </div>
        </div>
        <span
          class="dots font-24 sm:hidden px-4 pt-4"
          data-test-id="remove-all-products-id"
          @click="removeAllProducts"
        />
      </div>
    </div>

    <div class="sm:flex flex-col gap-3 items-center hidden">
      <span
        v-if="showColumnTitles"
        data-test-id="column-title-id"
      >
        {{ $t('quantity') }}
      </span>
      <div
        class="flex flex-col items-center border-b p-4 h-full w-full gap-3 border-branded-gray"
        :class="{ 'border-t': isFirstItem }"
      >
        <base-counter
          v-model="productItemQuantity"
          data-test-id="base-counter-id"
          :min-value="1"
        />
        <base-icon
          class="w-4 h-4 cursor-pointer"
          name="basket-trash"
          data-test-id="remove-all-icon-id"
          @click="removeAllProducts"
        />
      </div>
    </div>

    <div class="sm:flex flex-col gap-3 items-end hidden justify-between">
      <div class="flex flex-col gap-3 text-end w-full h-full">
        <span
          v-if="showColumnTitles"
          class="hidden sm:block"
          data-test-id="column-title-id"
        >
          {{ $t('subtotal') }}
        </span>
        <div
          class="flex flex-col gap-1 border w-full h-full border-branded-gray p-4"
          :class="{ 'border-t-0': !isFirstItem }"
        >
          <i18n-n
            v-if="productSubtotal.subtotalProductPriceWithoutDiscount"
            class="text-14 line-through"
            format="currency"
            tag="span"
            data-test-id="product-price-without-discount"
            :value="productSubtotal.subtotalProductPriceWithoutDiscount"
          />
          <i18n-n
            format="currency"
            :class="{
              'text-velux-red': productSubtotal.subtotalProductPriceWithoutDiscount
            }"
            tag="span"
            :value="productSubtotal.subtotalProductPrice"
          />
          <i18n-n
            v-if="doesContributionFeeExist"
            class="mt-auto"
            data-test-id="contribution-fee-sum-id"
            format="currency"
            tag="span"
            :value="productAdditionalFee"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ScText from '@/components/sitecore-components/text/ScText.vue'
import ScImage from '@/components/sitecore-components/image/ScImage.vue'
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import BaseCounter from '@/components/self-components/BaseCounter/BaseCounter.vue'
import ProductOverviewInfo from '../ProductOverviewInfo/ProductOverviewInfo.vue'

import { ProductOverviewItemProps } from './ProductOverviewItem.d'

const props = withDefaults(defineProps<ProductOverviewItemProps>(), {
  productTitle: '',
  productId: '',
  productLineId: '',
  productImage: '',
  productQuantity: 0,
  productSubtotal: () => ({
    subtotalProductPrice: null,
    subtotalProductPriceWithoutDiscount: null
  }),
  productAdditionalFee: null,
  productAdditionalFeeLabel: '',
  productPicassoMessages: () => [],
  productAttributes: () => [],
  showColumnTitles: false,
  isFirstItem: false
})

const emit = defineEmits<{
  addProduct: [{ productLineId: string; quantity: number }]
  removeProduct: [{ productLineId: string; quantity: number }]
  removeAllProducts: [{ productLineId: string; quantity: 0 }]
}>()

const productItemQuantity = computed({
  get() {
    return props.productQuantity
  },
  set(value) {
    if (value < productItemQuantity.value) {
      removeProduct(value)

      return
    }

    addProduct(value)
  }
})
const addProduct = (quantity: number) => {
  emit('addProduct', { productLineId: props.productLineId, quantity })
}

const removeProduct = (quantity: number) => {
  emit('removeProduct', { productLineId: props.productLineId, quantity })
}

const removeAllProducts = () => {
  emit('removeAllProducts', {
    productLineId: props.productLineId,
    quantity: 0
  })
}

const doesContributionFeeExist = computed<boolean>(
  () => props?.productAdditionalFeeLabel?.length && props.productAdditionalFee !== null
)
</script>
<style scoped lang="scss">
.dots {
  &:after {
    content: '\2807';
  }
}
</style>
