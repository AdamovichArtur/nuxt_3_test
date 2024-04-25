<template>
  <div
    class="headerOffCanvas show-for-small-only"
    :class="[headerNavigation?.showOC ? '--show' : '']"
  >
    <div class="headerOffCanvas__close" />

    <div class="headerOffCanvas__menu">
      <ul class="grid-x cell small-12">
        <li>
          <input
            type="text"
            placeholder="##Dummy Search##"
          />
        </li>
        <template
          v-for="(level1, index) in headerNavigation?.mainNavigation"
          :key="index"
        >
          <header-off-canvas-list
            class="cell small-12"
            :menu-data="level1"
            :level="0"
          />
        </template>
        <li
          v-if="
            globalStore.isLoginEnabled() && routeData?.placeholders['my-account-modal']?.length > 0
          "
          class="headerOffCanvas__menuSignInButton"
        >
          <link-or-modal
            v-if="!globalStore.isUserLoggedIn()"
            name="my-account-modal"
            class="--fitContentModal"
          >
            <base-icon
              name="user-icon"
              class="w-4 h-4 mr-0.5"
            />
            <span>{{ $t('sign-in') }}</span>
          </link-or-modal>
          <div v-if="globalStore.isUserLoggedIn()">
            <div class="flex items-center">
              <base-icon
                name="user-icon"
                class="w-4 h-4 mr-0.5"
              />
              <span>{{ $t('hello') }}</span>
            </div>
            <header-my-account-links-card class="--myAccountBehaviorTwoMobile" />
          </div>
        </li>
      </ul>

      <placeholder
        name="header-languageselector"
        :rendering="routeData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { useGlobalStore } from '@/stores/GlobalStore'
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue'
import { inject } from 'vue'
import HeaderMyAccountLinksCard from './_HeaderMyAccountLinksCard.vue'
import HeaderOffCanvasList from './_HeaderOffCanvasList.vue'

let globalStore = useGlobalStore()

const headerNavigation: any = inject('headerNavigation')
const routeData: any = inject('routeData')
const linkOrModal: any = inject('linkOrModal')
</script>

<style scoped lang="scss">
//TODO: Remove this and replace with a proper search field
input[type='text'] {
  display: block;
}

.headerOffCanvas {
  z-index: 1;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: get-color-var('black');
    opacity: 0;
    height: 100vh;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
  }

  &__close {
    display: block;
    position: absolute;
    top: -4rem;
    left: calc(10% - 1rem);
    width: 2rem;
    height: 2rem;
    pointer-events: none;
    transition: top 0.3s ease-in-out;
    transition-delay: 0.2s;

    &::before,
    &::after {
      content: '';
      display: block;
      width: 0.2rem;
      height: 100%;
      background: get-color-var('white');
      position: absolute;
      left: 50%;
      top: 0;
      transform: rotate(45deg);
    }

    &::before {
      transform: rotate(-45deg);
    }
  }

  &__menu {
    overflow: auto;
    background: var(--offCanvasMenuBackgroundColor);
    width: 80%;
    position: fixed;
    right: -80%;
    top: 0;
    z-index: 1;
    transition: right 0.3s ease-in-out;
    height: 100vh;

    > ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    // DUMMY DESIGN FOR SIGNINBUTTON
    // We might change this based on if the button will be a component itself
    &SignInButton {
      background-color: get-color-var('black');
      width: 100%;
      margin: 1rem;
      line-height: 2.5;
      color: get-color-var('white');

      div span {
        cursor: pointer;
      }

      &:deep() {
        span,
        .modalComponent {
          &Button {
            cursor: pointer;
            display: flex;
            align-items: center;

            span {
              font-weight: 700;
              font-size: 1rem;
            }
          }
        }

        .modalComponentContent.active {
          margin: 0;
        }

        .modalComponentContent.active,
        .modalComponentContent.active .modalComponentContentInfo {
          width: 100%;
        }

        .modalComponentContentInfo .gridComponent .gridCell {
          padding-right: 0.625rem;
        }
      }
    }

    :deep(.languageSelector) {
      padding: 0 16px;
    }

    :deep(.languageSelector__label) {
      color: get-color-var('white');
    }

    :deep(.CurrentLanguage__chevron) {
      fill: get-color-var('white');
    }
  }

  &.--show {
    .headerOffCanvas__menu {
      right: 0;
    }

    .headerOffCanvas__close {
      top: 1rem;
    }

    .headerOffCanvas__overlay {
      opacity: 0.5;
      pointer-events: all;
      cursor: pointer;
    }
  }
}
</style>
