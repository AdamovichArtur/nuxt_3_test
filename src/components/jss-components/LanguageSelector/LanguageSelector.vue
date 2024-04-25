<template>
  <div class="languageSelector grid-x">
    <sc-text
      v-if="ScreenSizes.isMobile"
      class="languageSelector__label cell text-center show-for-small-only"
      :field="label"
    />
    <div ref="container" class="languageSelectorContainer cell">
      <div
        class="languageSelectorCurrentLanguage flex"
        @click="toggleLangSelector"
      >
        <div class="languageSelector__icon">
          <sc-image :media="currentSite.Image" />
        </div>
        <div
          class="languageSelectorCurrentLanguage__label text-center"
          :class="{ '--showLabel': showSelectedLabel }"
        >
          <sc-text
            v-if="showSelectedLabel || ScreenSizes.isMobile"
            :field="currentSite.SiteName"
          />
          <base-icon
            name="chevron-down-light"
            class="languageSelectorCurrentLanguage__chevron w-4 h-4"
            :class="{
              '--open': showOptionList,
            }"
          />
        </div>
      </div>
      <div v-if="showOptionList" class="languageSelectorOptionList">
        <a
          v-for="(site, index) in sites"
          :key="index"
          class="languageSelectorOptionItem"
          :href="site.Url"
        >
          <div class="languageSelector__icon">
            <sc-image :media="site.Image" />
          </div>
          <sc-text :field="site.SiteName" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/self-components/BaseIcon/BaseIcon.vue";
import { ScreenSizes } from "@/utils/utils";
import {
  Image as ScImage,
  Text as ScText,
} from "@sitecore-jss/sitecore-jss-vue";
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";

const props = defineProps({
  fields: {
    type: Object,
    required: true,
  },
});

const showOptionList = ref(false);
const container = ref(null);

onClickOutside(container, () => (showOptionList.value = false));

const label = computed(() =>
  get(props, "fields.ChooseLanguageLabel", { value: "" })
);
const sites = computed(() => get(props, "fields.Sites", []));
const showSelectedLabel = ref(
  get(props, "fields.ShowSelectedLanguageLabel.value", false)
);
const currentSite = computed(() =>
  get(props, "fields.CurrentSite.fields", { SiteName: { value: "" } })
);

const toggleLangSelector = () => (showOptionList.value = !showOptionList.value);
</script>

<style scoped lang="scss">
.languageSelector {
  display: flex;
  gap: 1rem;
  position: relative;

  @include breakpoint(medium) {
    height: 100%;
    align-items: center;
  }

  &__icon {
    width: 1.5rem;
    flex-shrink: 0;
  }

  &Container {
    cursor: pointer;
  }

  &CurrentLanguage {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    @include breakpoint(small only) {
      color: get-color-var("white");
      flex-wrap: nowrap;
    }

    &__label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      @include breakpoint(medium) {
        &.--showLabel {
          width: 100%;
        }
      }
    }

    &__chevron {
      transition: all 0.3s;
      flex-shrink: 0;

      &.--open {
        transform: rotate(180deg);
      }

      @include breakpoint(small only) {
        fill: get-color-var("white");
      }
    }
  }

  &Option {
    &List {
      @include breakpoint(medium) {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: get-color-var("white");
        border: get-var("borderVeryThin") solid get-color-var("black");
      }

      @include breakpoint(small only) {
        width: fit-content;
        margin: 0.5rem auto;
        color: get-color-var("white");
      }
    }

    &Item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      gap: 1rem;

      @include breakpoint(medium) {
        min-width: max-content;
        color: get-color-var("black");

        &:hover {
          background-color: get-color-var("gray", "light");
        }
      }

      @include breakpoint(small only) {
        color: get-color-var("white");
      }

      &__label {
        white-space: nowrap;
      }
    }
  }
}
</style>
