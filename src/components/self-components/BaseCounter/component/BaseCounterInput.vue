<template>
  <input
    ref="input"
    :value="quantity"
    pattern="[0-9]*"
    inputmode="numeric"
    @keypress="isNumber"
    @keyup.enter="triggerBlur"
    @blur="setValue"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { BaseCounterInputProps } from './../BaseCounter.d'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<BaseCounterInputProps>(), {
  modelValue: 1,
  maxValue: 999
})

const input = ref(null)
const quantity = ref(props.modelValue)

const isNumber = (event: KeyboardEvent): void => {
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault()
  }
}

const triggerBlur = () => input.value.blur()

const setValue = (evt) => {
  const value = parseInt(evt.target.value)
  if (quantity.value === value) return

  if (!value) {
    evt.target.value = quantity.value?.toString()
    return
  }

  let currentValue = value
  if (value > props.maxValue) {
    currentValue = props.maxValue
    evt.target.value = props.maxValue?.toString()
  }

  quantity.value = currentValue
  emit('update:modelValue', currentValue)
}
watch(
  () => props.modelValue,
  (value) => {
    if (quantity.value !== value) quantity.value = value
  }
)
</script>
