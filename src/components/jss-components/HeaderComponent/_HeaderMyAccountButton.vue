<template>
  <div class="headerMyAccountButton">
    <!-- Show when user is logged in -->
    <div
      v-if="globalStore?.isUserLoggedIn()"
      class="show-for-medium"
      @mouseover="showDropdown = true"
      @mouseleave="showDropdown = false"
    >
      <a
        href="#myaccount"
        class="headerMyAccountButtonLoggedIn"
      >
        <header-my-account-logged-in-button :button-text="fields?.Link?.value?.text" />
      </a>
      <header-my-account-links-card
        :is-visible="showDropdown"
        class="--myAccountBehaviorOneMobile"
      />
    </div>

    <ModalComponent
      v-if="globalStore?.isUserLoggedIn()"
      :modal-header="fields?.Link?.value?.text"
      :dynamiccomp="HeaderMyAccountLinksCard"
      class="--myAccountMobileLoggedIn show-for-small-only"
    >
      <header-my-account-logged-in-button :button-text="fields?.Link?.value?.text" />
    </ModalComponent>

    <!-- Show when user is not logged in -->
    <link-or-modal
      v-if="!globalStore?.isUserLoggedIn()"
      name="my-account-modal-button"
      class="--headerModal --fitContentModal"
    >
      <base-icon
        name="user-thin-icon"
        class="sm:w-7 sm:h-7 w-5 h-5 mb-0.5"
      />
    </link-or-modal>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { useGlobalStore } from '@/stores/GlobalStore'
import { inject, reactive, ref } from 'vue'
import ModalComponent from '../ModalComponent/ModalComponent.vue'
import HeaderMyAccountLinksCard from './_HeaderMyAccountLinksCard.vue'
import HeaderMyAccountLoggedInButton from './_HeaderMyAccountLoggedInButton.vue'

let linkOrModal: any = inject('linkOrModal')
let routeData: any = inject('routeData')
let globalStore = useGlobalStore()
const showDropdown = ref(false)

const fields = reactive(routeData?.placeholders['my-account-modal-button'][0]?.fields)
</script>

<style scoped lang="scss">
@import 'foundation-sites/scss/foundation';
.headerMyAccountButton {
  .--myAccountMobileLoggedIn {
    &:deep() {
      .modalComponentContent.active {
        margin: 0;

        .modalComponentContentInfo {
          .headerMyAccountLinksCard {
            position: static;
            border: 0;

            h2 {
              display: block;
            }
          }
        }
      }

      .modalComponentContent.active,
      .modalComponentContent.active .modalComponentContentInfo,
      .modalComponentContent.active .modalComponentContentInfo .headerMyAccountLinksCard {
        width: 100%;
      }
    }
  }
}
</style>
