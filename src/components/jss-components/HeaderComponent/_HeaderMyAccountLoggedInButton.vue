<template>
  <div class="headerMyAccountLoggedInButton">
    <base-icon
      name="user-thin-icon"
      class="sm:w-7 sm:h-7 w-5 h-5 mb-0.5"
    />
    <span class="show-for-medium">{{ buttonText }}</span>
    <span class="show-for-medium">{{ $t('signed-in') }}</span>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'

defineProps({
  buttonText: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.headerMyAccountLoggedInButton {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.5rem;
  padding-left: 0.5rem;
  color: get-color-var('black');

  span:last-child::after {
    content: '';
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 0.2rem;
    transform: rotate(45deg);
    border-bottom: 0.05rem solid get-color-var('black');
    border-right: 0.05rem solid get-color-var('black');
    position: relative;
    top: -0.05rem;
  }
}
</style>
