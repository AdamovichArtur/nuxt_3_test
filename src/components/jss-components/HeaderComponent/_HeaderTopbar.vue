<template>
  <div class="grid-x headerTopbar medium-12 show-for-medium align-justify">
    <div
      v-if="globalStore.customerServiceOpen"
      class="cell shrink headerTopbarContactInfo"
    >
      <!-- shop open link -->
      <sc-link :field="fields.ShopOpenLink">
        <sc-text :field="fields.ShopOpenLabel" />
      </sc-link>
    </div>
    <div
      v-else
      class="cell shrink headerTopbarContactInfo"
    >
      <!-- shop closed link -->
      <sc-link :field="fields.ShopClosedLink">
        <sc-text :field="fields.ShopClosedLabel" />
      </sc-link>
    </div>
    <ul class="headerTopbarMenu cell auto grid-x align-right">
      <li
        v-for="item in topBarLinks"
        :key="item.id"
        class="headerTopbarMenuItem"
      >
        <link-or-modal
          class="headerTopbarMenuItemLink"
          :fields="item"
        >
          <sc-text :field="item.Title" />
        </link-or-modal>
      </li>
      <!-- li with login if login is enabled -->
      <li
        v-if="
          globalStore.isLoginEnabled() && routeData?.placeholders['my-account-modal']?.length > 0
        "
        class="headerTopbarMenuItem"
      >
        <link-or-modal
          v-if="!globalStore.isUserLoggedIn()"
          name="my-account-modal"
          class="headerTopbarMenuItemLogin --fitContentModal"
        >
          <base-icon
            name="user-icon"
            class="w-4 h-4 mr-0.5"
          />
          <span>{{ $t('sign-in') }}</span>
        </link-or-modal>
        <div
          v-if="globalStore.isUserLoggedIn()"
          @mouseover="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <a
            href="#myaccount"
            class="headerTopbarMenuItemLogin"
          >
            <span class="headerTopbarMenuItemLoginGreeting flex">
              <base-icon
                name="user-icon"
                class="w-4 h-4 mr-0.5"
              />
              {{ $t('hello') }}
            </span>
          </a>
          <header-my-account-links-card
            :is-visible="showDropdown"
            class="--behaviorTwo"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { useGlobalStore } from '@/stores/GlobalStore'
import { Link as ScLink, Text as ScText } from '@sitecore-jss/sitecore-jss-vue'
import { inject, ref, watch } from 'vue'
import HeaderMyAccountLinksCard from './_HeaderMyAccountLinksCard.vue'

const props = defineProps({
  fields: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
let globalStore = useGlobalStore()

const callUsTime: any = inject('callUsTime')
let headerNavigation: any = inject('headerNavigation')
let linkOrModal: any = inject('linkOrModal')
let routeData: any = inject('routeData')
const showDropdown = ref(false)

//This is pretty shitty, but it is what it is
watch(callUsTime, async () => {
  if (globalStore.customerServiceOpen && props.fields.ShopOpenLink.value.href) {
    location.href = props.fields.ShopOpenLink.value.href
  }
})

let topBarLinks = []

let getLinkRecursively = (menuItem) => {
  if (menuItem?.IncludeInTopBar?.value) {
    topBarLinks.push({
      Link: menuItem.Link,
      Title: menuItem.Title
    })
  }

  for (let l = 0; l < menuItem?.children?.length; l++) {
    getLinkRecursively(menuItem.children[l])
  }
}

for (let i = 0; i < headerNavigation?.mainNavigation?.length; i++) {
  getLinkRecursively(headerNavigation?.mainNavigation[i])
}
</script>

<style scoped lang="scss">
.headerTopbar {
  margin-bottom: 1rem;
  margin-top: -1rem;
  font-size: 0.8rem;
  background-color: var(--topBarBackgroundColor);
  position: relative;

  &ContactInfo a,
  &MenuItemLink {
    cursor: pointer;
    padding: 0.8rem 1rem;
  }

  &ContactInfo a,
  &MenuItemLink,
  &MenuItemLogin {
    display: flex;
    color: get-color-var('white');
  }

  &Menu {
    margin: 0;

    &Item {
      display: inline-block;
      border-left: 0.063rem solid get-color-var('white');

      &Login {
        &:deep() {
          .modalComponentButton {
            display: flex;
            cursor: pointer;
            padding: 0.8rem 1rem;
          }
        }

        &Greeting {
          padding: 0.8rem 1rem;
        }
      }
    }
  }
}
</style>
