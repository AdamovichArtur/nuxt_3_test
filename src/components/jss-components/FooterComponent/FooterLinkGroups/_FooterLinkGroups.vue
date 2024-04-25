<template>
  <div
    class="sm:p-8 linkGroupsWrapper"
    :class="footerWrapperClasses"
    data-test-id="test-id-modifier"
  >
    <div
      class="grid sm:grid-cols-4 grid-cols-1 sm:gap-5 divide-y divide-velux-white sm:divide-none"
    >
      <div
        v-for="(group, index) in footerData?.LinkGroups"
        :key="index"
        :class="{
          'hidden test-hidden-class': isMobile && !doesLinkExist(group?.fields)
        }"
        data-test-id="test-id-column-wrapper"
      >
        <div class="text-velux-black flex flex-col sm:gap-4 px-4 py-4 sm:py-0 sm:pl-0">
          <div
            class="headerWrapper flex items-center hover:cursor-pointer sm:hover:cursor-default"
            :class="{
              'justify-end sm:justify-between test-class-visible':
                group.fields?.HideHeaderForSmallScreens?.value,
              'justify-between test-class-invisible':
                !group.fields?.HideHeaderForSmallScreens?.value
            }"
            data-test-id="test-id-expand"
            @click.stop="handleHeaderClick(group)"
          >
            <sc-text
              tag="h5"
              :field="group?.fields?.Header"
              :class="{
                'hidden sm:block test-id-hidden-class justify-end test-class-visible':
                  group.fields?.HideHeaderForSmallScreens?.value
              }"
              class="mb-0"
              data-test-id="test-id-header-item"
            />

            <base-icon
              name="chevron-down-light"
              class="w-5 h-5 sm:hidden transition-transform"
              data-test-id="test-id-base-icon"
              :class="{
                'rotate-180 test-class-expanded': group.expanded
              }"
            />
          </div>

          <div
            class="flex flex-col gap-4 transition-opacity duration-300"
            data-test-id="test-id-links-wrapper"
            :class="{
              'invisible max-h-0 opacity-0 mt-0 test-class-invisible': isMobile && !group.expanded,
              'mt-4 test-class-visible': isMobile && group.expanded
            }"
          >
            <template
              v-for="linkItem in group?.fields?.Items"
              :key="linkItem.id"
            >
              <div
                v-if="linkItem?.fields?.Label?.value?.length"
                data-test-id="test-id-link-item"
                class="flex items-center gap-2"
              >
                <base-icon
                  name="filled-right-arrow"
                  class="filledRightArrow min-w-2"
                  :size="2"
                />
                <sc-link
                  class="text-velux-black hover:text-velux-red"
                  :field="linkItem?.fields?.Link"
                >
                  <sc-text
                    class="text-14 sm:text-16"
                    :field="linkItem?.fields?.Label"
                  />
                </sc-link>
              </div>

              <div
                v-if="linkItem?.fields?.ImageLinks?.length"
                data-test-id="test-id-social-wrapper"
                class="sm:flex hidden flex-col gap-4"
              >
                <sc-text
                  class="text-14 sm:text-16"
                  :field="linkItem?.fields?.Header"
                />
                <footer-social-media
                  :header="linkItem?.fields?.Header"
                  :social-media-items="linkItem?.fields?.ImageLinks"
                />
              </div>

              <footer-external-script
                v-if="linkItem?.fields?.Script?.value?.length"
                data-test-id="test-id-external-script"
                class="hidden sm:block"
                :script="linkItem.fields.Script.value"
              />
            </template>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center gap-4 sm:hidden">
        <div
          v-if="isSocialMediaEmpty"
          class="flex flex-col justify-center gap-4 mt-4"
          data-test-id="test-id-social-media-mobile"
        >
          <sc-text
            class="text-16 text-center"
            :field="externalScriptAndSocialMedia.socialMedia.header"
          />

          <footer-social-media
            class="justify-center"
            :social-media-items="externalScriptAndSocialMedia.socialMedia.items"
          />
        </div>

        <footer-external-script
          v-if="isExternalScriptEmpty"
          class="max-w-80 mx-auto mt-4 sm:mx-0 sm:mt-0"
          :script="externalScriptAndSocialMedia.externalScript.script"
          data-test-id="test-id-external-script-mobile"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import useBreakpoints from '@/utils/composables/viewport/useBreakpoints'

import ScText from '@/components/sitecore-components/text/ScText.vue'
import FooterSocialMedia from './components/FooterSocialMedia/FooterSocialMedia.vue'
import FooterExternalScript from './components/FooterExternalScript/FooterExternalScript.vue'
import BaseIcon from '@/components/self-components/BaseIcon/BaseIcon.vue'
import { Link as ScLink } from '@sitecore-jss/sitecore-jss-vue'

import { FooterLinkGroupsProps, ExternalScriptAndSocialMediaProps } from './FooterLinkGroups.d'

const { isMobile } = useBreakpoints()

const props = withDefaults(defineProps<FooterLinkGroupsProps>(), {
  fields: () => ({
    LinkGroups: [],
    Layout: { value: '' }
  })
})

const footerData = reactive(props.fields)

const doesLinkExist = (footerData) => {
  if (!footerData?.Items.length) return

  return footerData.Items.some((item) => item?.fields?.Link?.value?.href?.length)
}

const externalScriptAndSocialMedia = computed<ExternalScriptAndSocialMediaProps>(() => {
  if (!props.fields?.LinkGroups?.length) {
    return {
      socialMedia: { items: [], header: { value: '' } },
      externalScript: { script: '' }
    }
  }

  return props.fields?.LinkGroups.reduce(
    (acc, it) => {
      const items = it.fields?.Items || []
      let externalScriptData = null
      let socialMediaData = null

      for (const item of items) {
        if (!externalScriptData && item.fields.Script) {
          externalScriptData = item
        }

        if (!socialMediaData && item.fields.ImageLinks) {
          socialMediaData = item
        }

        if (externalScriptData && socialMediaData) break
      }

      if (externalScriptData || socialMediaData) {
        acc.socialMedia = {
          items: socialMediaData?.fields?.ImageLinks || [],
          header: socialMediaData?.fields?.Header || ''
        }
        acc.externalScript = {
          script: externalScriptData?.fields?.Script?.value || ''
        }
      }

      return acc
    },
    { socialMedia: { items: [], header: { value: '' } }, externalScript: { script: '' } }
  )
})

const isExternalScriptEmpty = computed<boolean>(() => {
  return !!externalScriptAndSocialMedia.value?.externalScript?.script.length
})

const isSocialMediaEmpty = computed<boolean>(() => {
  return !!externalScriptAndSocialMedia.value?.socialMedia?.items?.length
})

const footerWrapperClasses = computed<string>(() =>
  footerData.Layout?.value ? 'test-modifier linkGroupsWrapper--' + footerData.Layout.value : ''
)

const handleHeaderClick = (group) => {
  if (!isMobile.value) return

  group.expanded = !group.expanded
}
</script>

<style scoped lang="scss">
.linkGroupsWrapper {
  .filledRightArrow {
    display: none;
  }

  &--sleek,
  &--accent {
    @apply bg-velux-black;

    h5,
    a,
    span,
    svg {
      @apply text-velux-white;
    }
  }

  &--colorful {
    @apply bg-velux-red;

    h5,
    a,
    span,
    svg {
      @apply text-velux-white;
    }

    .headerWrapper {
      @apply sm:border-b border-velux-white border-opacity-60 sm:pb-2;
    }

    .filledRightArrow {
      display: block;
    }
  }
}
</style>
