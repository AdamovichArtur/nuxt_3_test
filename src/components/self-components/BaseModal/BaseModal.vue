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
        class="flex items-center justify-center min-h-screen"
        aria-hidden="true"
        @click="closeDialog"
      >
        <div
          class="fixed inset-0 bg-velux-black/70"
          aria-hidden="true"
        />
        <transition-child v-bind="transitionStyle">
          <dialog-panel
            class="bg-velux-white relative z-50"
            :class="customClasses"
          >
            <div
              ref="focusedElement"
              class="overflow-hidden p-10 relative"
            >
              <base-icon
                v-if="!preventClosing"
                class="absolute right-4 top-4 w-4 h-4 cursor-pointer"
                name="close"
                @click="closeDialog"
              />
              <slot />
            </div>
          </dialog-panel>
        </transition-child>
      </dialog-overlay>
    </base-dialog>
  </transition-root>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog as BaseDialog,
  DialogOverlay,
  DialogPanel
} from '@headlessui/vue'

import { BaseModalProps } from './BaseModal.d'

const props = withDefaults(defineProps<BaseModalProps>(), {
  modelValue: false,
  customClasses: '',
  preventClosing: false,
  transitionType: 'smooth'
})

const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const focusedElement = ref(null)
const closeDialog = () => {
  if (!props.preventClosing) emit('update:modelValue', false)
}

const transitionStyle = computed(() => {
  switch (props.transitionType) {
    case 'jump':
      return {
        enter: 'duration-300 ease-out  fixed z-50',
        enterFrom: 'top-full',
        enterTo: 'top-0',
        leave: 'duration-200 ease-in  fixed z-50',
        leaveFrom: 'top-0',
        leaveTo: 'top-full'
      }
    default:
      return {
        enter: 'transition-all ease-in-out duration-300',
        enterFrom: 'opacity-0 translate-y-6',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'transition-all ease-in-out duration-300',
        leaveFrom: 'opacity-100',
        leaveTo: 'opacity-0'
      }
  }
})
</script>
