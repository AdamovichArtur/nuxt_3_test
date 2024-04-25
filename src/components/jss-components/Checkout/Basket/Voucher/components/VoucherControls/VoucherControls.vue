<template>
  <div class="flex flex-col gap-2">
    <div class="flex">
      <base-input
        v-model:userInput="voucherCode"
        type="text"
        name="voucherCode"
        data-test-id="input-test-id"
        :use-placeholder="true"
        :label="placeholderText"
      />
      <vlx-button
        class="ml-2 mb-0"
        data-test-id="button-test-id"
        :label="buttonText.value"
        :is-bottom-indent="false"
        :size="'small'"
        @click="applyVoucher"
      />
    </div>

    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showNotificationMessageBlock"
        class="border py-2 pl-3 text-14 transition-all"
        :class="notificationClasses"
        data-test-id="test-notification-block-id"
      >
        <div class="flex gap-1 items-center">
          <base-icon
            v-if="isVoucherInvalid"
            name="warning-icon"
            class="w-3 h-3"
            data-test-id="test-base-icon-id"
          />
          <sc-text :field="notificationMessage" />
          <vlx-button
            v-if="isVoucherValid"
            class="mb-0 ml-auto"
            :label="deleteButtonText.value"
            :is-bottom-indent="false"
            size="small"
            text-only
            data-test-id="delete-button-test-id"
            @click="deleteVoucher"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VoucherControlsProps, VoucherStatuses } from './VoucherControls.d'

import baseInput from '@/components/self-components/FormComponents/BaseInput/BaseInput.vue'
import VlxButton from '@/components/self-components/FormComponents/BaseButton/BaseButton.vue'
import ScText from '@/components/sitecore-components/text/ScText.vue'
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'

const props = withDefaults(defineProps<VoucherControlsProps>(), {
  placeholderText: '',
  buttonText: () => ({ value: '' }),
  deleteButtonText: () => ({ value: '' }),
  notificationMessage: () => ({ value: '' }),
  voucherCode: '',
  voucherStatus: VoucherStatuses.NotExist
})

const emit = defineEmits<{
  applyVoucher: [{ voucherCode: string }]
  deleteVoucher: []
}>()

const voucherCode = ref(props.voucherCode)

const notificationClassesConfig = {
  [VoucherStatuses.NotExist]: 'opacity-0 test-opacity-class',
  [VoucherStatuses.Invalid]:
    'border-velux-red text-velux-red bg-velux-light-red test-invalid-class',
  [VoucherStatuses.Valid]:
    'border-velux-splash-green text-black bg-velux-splash-green test-valid-class',
  [VoucherStatuses.NoProducts]:
    'border-velux-splash-green text-black bg-velux-splash-green test-valid-class',
  Default: 'opacity-0 test-opacity-class'
}

const notificationClasses = computed<string>(() => {
  if (!notificationClassesConfig?.[props.voucherStatus]) return notificationClassesConfig.Default

  return notificationClassesConfig[props.voucherStatus]
})
const isVoucherValid = computed<boolean>(() => props.voucherStatus === VoucherStatuses.Valid)
const isVoucherInvalid = computed<boolean>(() => props.voucherStatus === VoucherStatuses.Invalid)
const showNotificationMessageBlock = computed<boolean>(
  () => props.notificationMessage?.value?.length > 0 && voucherCode.value.length > 0
)

const applyVoucher = () => {
  if (!voucherCode.value.length) return

  emit('applyVoucher', { voucherCode: voucherCode.value })
}

const deleteVoucher = () => {
  voucherCode.value = ''

  emit('deleteVoucher')
}
</script>
