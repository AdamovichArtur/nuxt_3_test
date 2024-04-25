<template>
  <transition-root
    :show="modelValue"
    as="template"
  >
    <base-dialog
      class="fixed top-0 left-0 w-screen h-full z-60 overflow-y-scroll"
      :initial-focus="focusedElement"
    >
      <dialog-overlay
        class="flex items-end justify-center min-h-screen"
        aria-hidden="true"
        @click="closeDialog"
      >
        <div
          class="fixed inset-0 bg-velux-black/50"
          aria-hidden="true"
        />
        <transition-child
          class="flex-1"
          enter="transition-all ease-in-out duration-300"
          enter-from="opacity-0 translate-y-8"
          enter-to="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0 translate-y-8"
        >
          <dialog-panel
            class="bg-velux-white relative z-50 w-full"
            :class="customClasses"
          >
            <div
              ref="focusedElement"
              class="overflow-hidden relative"
            >
              <slot />
            </div>
          </dialog-panel>
        </transition-child>
      </dialog-overlay>
    </base-dialog>
  </transition-root>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import {
  TransitionRoot,
  TransitionChild,
  Dialog as BaseDialog,
  DialogOverlay,
  DialogPanel
} from '@headlessui/vue'

import { BaseBottomBarProps } from './BaseBottomBar.d'

const props = withDefaults(defineProps<BaseBottomBarProps>(), {
  modelValue: false,
  customClasses: '',
  preventClosing: false
})

const emit = defineEmits(['update:modelValue'])

const focusedElement = ref(null)

const closeDialog = () => {
  if (!props.preventClosing) emit('update:modelValue', false)
}
</script>
