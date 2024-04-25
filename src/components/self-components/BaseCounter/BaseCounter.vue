<template>
  <div class="flex">
    <button
      class="cursor-pointer py-1 px-3 sm:py-2 sm:px-4 border border-solid border-velux-light-grey"
      :class="{
        'disabled cursor-auto': isDecrementNotAvailable
      }"
      @click="decrement"
    >
      <span
        class="m-auto text-12 sm:text-16"
        :class="{
          'text-velux-light-grey': isDecrementNotAvailable
        }"
      >
        &#8722;
      </span>
    </button>
    <div class="border border-solid border-l-0 border-r-0 border-velux-light-grey flex">
      <base-counter-input
        v-model:modelValue="quantity"
        :max-value="maxValue"
        class="m-auto text-velux-black text-12 sm:text-16 w-10 text-center h-full"
      />
    </div>

    <button
      class="cursor-pointer py-1 px-3 sm:py-2 sm:px-4 border border-solid border-velux-light-grey"
      :class="{
        'disabled cursor-auto': isIncrementNotAvailable
      }"
      @click="increment"
    >
      <span
        class="text-velux-black m-auto text-12 sm:text-16"
        :class="{
          'text-velux-light-grey': isIncrementNotAvailable
        }"
      >
        &#43;
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BaseCounterProps } from './BaseCounter.d'
import BaseCounterInput from './component/BaseCounterInput.vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<BaseCounterProps>(), {
  modelValue: 0,
  minValue: 0,
  maxValue: 999
})

const quantity = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const maxValue = computed(() => props.maxValue)

const isDecrementNotAvailable = computed(() => quantity.value <= props.minValue)
const isIncrementNotAvailable = computed(() => quantity.value >= props.maxValue)

const increment = () => {
  if (isIncrementNotAvailable.value) return

  quantity.value++
}

const decrement = () => {
  if (isDecrementNotAvailable.value) return

  quantity.value--
}
</script>
