<template>
  <div
    v-if="propsValidator"
    data-test-id="base-message-id"
    class="flex flex-nowrap border-solid border-2"
    :class="borderClass"
  >
    <div
      class="flex justify-center items-center px-4 shrink-0"
      :class="backgroundClass"
    >
      <base-icon
        :name="messageIcon"
        class="w-4 h-4 text-white shrink-0"
      />
    </div>

    <sc-text
      data-test-id="sc-text"
      tag="div"
      :field="{ value: messageText }"
      class="px-5 py-3"
    />
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import ScText from '@/components/sitecore-components/text/ScText.vue'
import { withDefaults, computed } from 'vue'
import { MessageType, type BaseMessageProps } from './BaseMessage.d'

const props = withDefaults(defineProps<BaseMessageProps>(), {
  messageText: '',
  messageIcon: 'warning-icon'
})
const propsValidator = computed(() => Object.values(MessageType).includes(props.type))

const { Error, Warning, Info, Success } = MessageType

const borderVariants = {
  [Error]: 'border-velux-red test-error-class',
  [Warning]: 'border-velux-yellow test-warning-class',
  [Info]: 'border-velux-light-grey test-info-class',
  [Success]: 'border-velux-splash-green test-success-class'
}
const borderClass = computed(() => borderVariants[props.type])

const backgroundVariants = {
  [Error]: 'bg-velux-red test-error-class',
  [Warning]: 'bg-velux-yellow test-warning-class',
  [Info]: 'bg-velux-light-grey test-info-class',
  [Success]: 'bg-velux-splash-green test-success-class'
}
const backgroundClass = computed(() => backgroundVariants[props.type])
</script>
