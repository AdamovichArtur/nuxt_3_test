<template>
  <metainfo>
    <template #title="{ content }">{{ content }}</template>
  </metainfo>
  <div>
    <h1>Page not found</h1>
    <p>This page does not exist.</p>
    <p v-if="context && context.site">
      Site: {{ context.site.name }}
      <br />
      Language: {{ context.language }}
    </p>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useMeta } from 'vue-meta'

export default {
  name: 'NotFound',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    context: {
      type: Object
    }
  },
  setup() {
    const { t } = useI18n()
    useMeta({
      title: t('page-not-found')
    })
  }
}
</script>
