<template>
  <div v-html="script" />
</template>

<script setup lang="ts">
import { FooterExternalScriptProps } from './FooterExternalScript.d'

withDefaults(defineProps<FooterExternalScriptProps>(), {
  script: ''
})
</script>
