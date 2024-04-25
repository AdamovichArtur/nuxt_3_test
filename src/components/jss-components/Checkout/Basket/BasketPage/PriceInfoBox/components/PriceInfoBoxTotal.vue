<template>
  <div class="flex items-center justify-between text-16 sm:text-20 font-bold">
    <span>{{ $t('total') }}</span>
    <span>
      <i18n-n
        format="currency"
        tag="span"
        :value="totalSum"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { PriceInfoBoxTotalProps } from '../PriceInfoBox.d'

withDefaults(defineProps<PriceInfoBoxTotalProps>(), {
  totalSum: 0
})
</script>
