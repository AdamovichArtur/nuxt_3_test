<template>
  <div v-if="enableVoucherForm.value">
    <voucher-visibility-control
      v-model="isVoucherBlockActive"
      :header-text="headerText"
      data-test-id="voucher-visibility-control-test-id"
      @click="showVoucherBlock"
    />
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="showVoucherControlsBlock"
        class="mt-4 sm:max-w-[500px] w-full"
        data-test-id="voucher-controls-container-test-id"
      >
        <voucher-controls
          :placeholder-text="placeholderText"
          :button-text="buttonText"
          :delete-button-text="deleteButtonText"
          :notification-message="responseMessage"
          :voucher-status="voucherStatus"
          :voucher-code="voucherCode"
          data-test-id="voucher-controls-test-id"
          @apply-voucher="applyVoucher"
          @delete-voucher="deleteVoucher"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { VoucherProps } from "./Voucher.d";
import { Field } from "@sitecore-jss/sitecore-jss-vue";
import { useBasketStore } from "@/stores/BasketStore/BasketStore";

import VoucherControls from "./components/VoucherControls/VoucherControls.vue";
import VoucherVisibilityControl from "./components/VoucherVisibilityControl/VoucherVisibilityControl.vue";
import { VoucherStatuses } from "./components/VoucherControls/VoucherControls.d";

const basketStore = useBasketStore();

const props = withDefaults(defineProps<VoucherProps>(), {
  fields: () => ({
    VoucherHeader: {
      value: "",
    },
    VoucherPlaceholder: {
      value: "",
    },
    VoucherSubmitButtonText: {
      value: "",
    },
    VoucherDeleteButtonText: {
      value: "",
    },
    VoucherSettings: {
      EnableVoucherForm: {
        value: false,
      },
      VoucherMessageError: {
        value: "",
      },
    },
  }),
});

const isVoucherBlockActive = ref(
  !!get(basketStore, "basket.voucher.VoucherCode", false)
);

const voucherStatus = computed<string>(() =>
  get(basketStore, "basket.voucher.VoucherStatus", "")
);
const voucherCode = computed(() =>
  get(basketStore, "basket.voucher.VoucherCode", "")
);
const responseMessage = computed(() => ({
  value: get(basketStore, "basket.voucher.ValidationMessage", ""),
}));

const headerText = computed<Field<string>>(() =>
  get(props, "fields.VoucherHeader", { value: "" })
);
const placeholderText = computed<string>(() =>
  get(props, "fields.VoucherPlaceholder.value", "")
);
const buttonText = computed<Field<string>>(() =>
  get(props, "fields.VoucherSubmitButtonText", { value: "" })
);
const deleteButtonText = computed<Field<string>>(() =>
  get(props, "fields.VoucherDeleteButtonText", { value: "Remove" })
);
const enableVoucherForm = computed<Field<boolean>>(() =>
  get(props, "fields.VoucherSettings.EnableVoucherForm", { value: true })
);
const voucherMessageError = computed<Field<string>>(() =>
  get(props, "fields.VoucherSettings.VoucherMessageError", { value: "" })
);
const showVoucherControlsBlock = computed<boolean>(
  () => isVoucherBlockActive.value || voucherCode.value.length > 0
);

const applyVoucher = debounce(async ({ voucherCode: pendingVoucherCode }) => {
  if (pendingVoucherCode === "") {
    basketStore.setVoucherValidationRule({
      ValidationMessage: voucherMessageError.value.value,
      IsVoucherValid: false,
    });

    return;
  }

  const isVoucherInvalid = voucherStatus.value === VoucherStatuses.Invalid;

  if (voucherCode.value !== pendingVoucherCode || isVoucherInvalid) {
    basketStore.applyVoucher(pendingVoucherCode);
  }
}, 300);

const deleteVoucher = debounce(() => {
  basketStore.deleteVoucher();
}, 300);

const showVoucherBlock = () => {
  isVoucherBlockActive.value = !isVoucherBlockActive.value;
};
</script>
