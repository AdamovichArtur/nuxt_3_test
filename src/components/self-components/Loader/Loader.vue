<template>
  <span class="loader" />
</template>

<style scoped>
.loader {
  @apply w-28 h-28 border-8 border-velux-residential-grey border-b-velux-light-red rounded-full inline-block box-border;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
