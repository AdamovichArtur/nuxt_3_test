<template>
  <div class="modalComponent grid-x">
    <div class="modalComponentButton" @click="openModal()">
      <slot />
    </div>

    <dialog
      ref="modalElm"
      class="modalComponentContent"
      :class="[modalLoading === true ? '--loading' : '']"
      @click="closeModal($event)"
    >
      <span class="modalComponentContentCloseBtn" @click="closeModal($event)">
        &times;
      </span>
      <div class="modalComponentContentInfo">
        <h1
          v-if="
            modalContent?.data?.item?.rendered?.sitecore?.route?.fields?.Header
              ?.value
          "
          class="modalComponentContentInfoHeader"
        >
          {{
            modalContent?.data?.item?.rendered?.sitecore?.route?.fields?.Header
              ?.value
          }}
        </h1>
        <h1 v-if="props?.modalHeader" class="modalComponentContentInfoHeader">
          {{ props?.modalHeader }}
        </h1>
        <placeholder
          v-if="modalContent?.data?.item"
          :class="[
            modalContent?.data?.item?.rendered?.sitecore?.route?.fields?.Layout
              ?.value == 'tiles'
              ? '--tiles'
              : '',
            modalContent?.data?.item?.rendered?.sitecore?.route?.templateId ==
            '4fbe865e-62c9-4e05-8a9c-a6c452de5ac1'
              ? '--helpModal'
              : '',
          ]"
          name="modal"
          :rendering="modalContent.data.item.rendered?.sitecore?.route"
        />
        <div v-if="props?.staticcontent" v-html="props?.staticcontent" />
        <component :is="props?.dynamiccomp" v-if="props?.dynamiccomp" />
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import config from "@/temp/config";
import { dataFetcher } from "@/dataFetcher";
import { Placeholder } from "@sitecore-jss/sitecore-jss-vue";
import { ScreenSizes } from "@/utils/utils";
const modalElm = ref(null);

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {},
  },
  staticcontent: {
    type: String,
    required: false,
    default: () => {},
  },
  modalHeader: {
    type: String,
    required: false,
    default: () => {},
  },
  dynamiccomp: {
    type: Object,
    required: false,
    default: () => {},
  },
});

let modalLoading = props.staticcontent === "";
const modalContent = ref({ data: {} });

function openModal() {
  if (modalElm?.value?.showModal) {
    modalElm.value.classList.add("active");

    modalElm.value.showModal();
    if (props?.fields) {
      dataFetcher<any>(config.graphQLEndpoint, {
        query: `query {
          item(path: "${props.fields?.Link?.value?.id}", language: "en") {
            rendered
          }
        }
      `,
      })
        .then(function (response) {
          modalLoading = false;
          if (response) {
            modalContent.value.data = response.data;
          }
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }

    // Content inside modal scrolled to top
    if (ScreenSizes.isMobile) {
      modalElm.value.scrollTo(0, 0);
    } else {
      modalElm.value.querySelector(".modalComponentContentInfo").scrollTo(0, 0);
    }
  }
  // Body scrolling becomes deactivated
  document.body.classList.add("-noScroll");
}

const closeModal = (event) => {
  // Close for clicking outside the modal or on the close button
  if (
    event.target.classList.value.indexOf("modalComponentContent") > -1 ||
    event.target.classList.value == "modalComponentContentCloseBtn"
  ) {
    modalElm.value.close();
    modalElm.value.classList.remove("active");

    // Body scrolling becomes active
    document.body.classList.remove("-noScroll");
  }
};
</script>
<style scoped lang="scss">
@import "foundation-sites/scss/foundation";

.headerTopbarMenuItemLinkModal {
  .modalComponentButton {
    color: get-color-var("white");
    padding: 0.8rem 1rem;
    cursor: pointer;
  }
}

.--headerModal {
  .modalComponentButton {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.5rem;
    cursor: pointer;
    padding-left: 0.5rem;
  }

  .modalComponentContent,
  .modalComponentContentInfo {
    @include breakpoint(small only) {
      width: 100%;

      &:deep() {
        .gridComponent {
          .gridCell {
            padding-right: 0.625rem;
          }
        }
      }
    }
  }
}

.--fitContentModal {
  .modalComponentContent {
    @include breakpoint(medium) {
      width: fit-content;
    }
  }
}

.modalComponentContent {
  border: 0;
  height: var(--window-inner-height);
  max-height: none;
  max-width: none;
  display: none;
  padding: 0;

  &[open] {
    display: flex;
  }

  &:focus-visible {
    outline: none;
  }

  &[open]::backdrop {
    animation: backdrop-fade 0.3s ease-in forwards;
  }

  &.close::backdrop {
    animation: backdrop-fade 0.3s ease-in backwards;
    animation-direction: reverse;
  }

  @keyframes backdrop-fade {
    from {
      background: transparent;
    }

    to {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(0.3rem);
    }
  }

  &CloseBtn {
    position: fixed;
    top: 0.3rem;
    right: 0.3rem;
    float: right;
    font-size: 3rem;
    font-weight: 100;
    cursor: pointer;
    line-height: 0.5;
    color: get-color-var("black");

    @include breakpoint(medium) {
      position: absolute;
      top: 0;
      right: -2rem;
      color: get-color-var("white");
      pointer-events: none;
    }
  }

  @include breakpoint(medium) {
    overflow: visible;
    width: 50rem;
    height: fit-content;
    max-width: 90vw;
    max-height: none;
  }

  &Info {
    @include breakpoint(medium) {
      overflow: auto;
      width: 100%;
      height: auto;
      max-height: 90vh;
    }

    &Header {
      background: get-color-var("white", "dark");
      border-bottom: 0.05rem solid get-color-var("gray");
      font-size: 1.25rem;
      font-weight: 700;
      padding: 0.5rem;
      line-height: 1.5;
      margin: 0;
      padding-right: 2rem;

      @include breakpoint(medium) {
        padding-right: 0;
      }
    }

    &:deep() {
      .gridComponent {
        .gridCell {
          @include breakpoint(small only) {
            padding-right: 2.5rem;
          }
        }

        &.--helpModal {
          .gridCell {
            padding-right: 0;
          }
        }
      }
    }
  }
}
</style>
