<template>
  <div
    v-show="props.isVisible"
    class="headerMyAccountLinksCard"
  >
    <div class="headerMyAccountLinksCardInfo">
      <h2>{{ $t('hello') }}</h2>
      <sc-link :field="siteSettings?.myAccountLinks?.MyAccountLink" />
      <sc-link :field="siteSettings?.myAccountLinks?.MyAccountManagerLink" />
      <sc-link :field="siteSettings?.myAccountLinks?.MyOrdersLink" />
      <sc-link :field="siteSettings?.myAccountLinks?.MyRewardsLink" />
    </div>
    <span
      class="headerMyAccountLinksCardSignOut"
      @click="logOut"
    >
      {{ $t('sign-out') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Link as ScLink } from '@sitecore-jss/sitecore-jss-vue'
import { inject } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: false,
    default: true
  }
})

let siteSettings: any = inject('siteSettings')

let logOut = () => {
  //TODO: Implement log out
  siteSettings.accountInfo.isLoggedIn = false
}
</script>

<style scoped lang="scss">
@import 'foundation-sites/scss/foundation';
.headerComponentInlineContainer {
  position: relative;
}

.headerMyAccountLinksCard {
  flex-direction: column;
  background-color: get-color-var('white');
  border: 0.1rem solid get-color-var('black');
  border-top: get-var('borderThick') solid get-color-var('secondary');
  width: 15rem;
  position: absolute;
  right: 0;
  z-index: 1;
  font-size: 0.8rem;
  padding: 0.5rem;
  color: get-color-var('black');

  &.--behaviorTwo {
    top: 2.7rem;
  }

  &Info {
    display: flex;
    flex-direction: column;
    border-bottom: get-var('borderThin') solid get-color-var('gray', 'light');
    padding-bottom: 0.5rem;

    h2 {
      display: none;
      font-size: 0.9rem;
      font-weight: 700;
    }

    a {
      margin-bottom: 0.5rem;
      color: get-color-var('black');
    }
  }

  &SignOut {
    display: block;
    padding-top: 0.5rem;
    cursor: pointer;
  }
}

.--myAccountBehaviorOneMobile {
  &.headerMyAccountLinksCard {
    @include breakpoint(small only) {
      display: none;
    }

    h2 {
      display: block;
    }
  }
}

.--myAccountBehaviorTwoMobile {
  &.headerMyAccountLinksCard {
    background-color: get-color-var('black');
    color: get-color-var('white');
    position: inherit;
    border: 0;
    width: auto;

    & .headerMyAccountLinksCardInfo {
      a {
        color: get-color-var('white');
      }

      h2 {
        display: none;
      }
    }
  }
}
</style>
