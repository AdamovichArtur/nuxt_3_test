<template>
  <div>
    <div class="mt-4">
      <vlx-button
        v-if="showProceedButton"
        :label="proceedButtonLinkText"
        :link-url="proceedButtonLink"
        style-importance="primary"
        full-width
        chevron
        :between-content="!isContentCentered"
        :is-bottom-indent="false"
        size="medium"
        data-test-id="button"
      />
    </div>
    <div>
      <vlx-button
        v-if="showSendEnquiryButton"
        :label="sendEnquiryLinkText"
        :link-url="sendEnquiryLink"
        style-importance="primary"
        full-width
        chevron
        :between-content="!isContentCentered"
        :is-bottom-indent="false"
        size="medium"
        data-test-id="button-send-enquiry"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VlxButton from '@/components/self-components/FormComponents/BaseButton/BaseButton.vue'

import { PriceInfoBoxActionsProps } from '../PriceInfoBox.d'

withDefaults(defineProps<PriceInfoBoxActionsProps>(), {
  showSendEnquiryButton: false,
  showProceedButton: false,
  isContentCentered: false,
  sendEnquiryLink: '',
  sendEnquiryLinkText: '',
  proceedButtonLinkText: '',
  proceedButtonLink: ''
})
</script>
