<template>
  <div class="tabsComponent">
    <ul class="tabsComponent_header">
      <tab-title
        v-for="(tab, index) in fields.Tabs"
        :key="tab?.id"
        :title="tab?.fields?.Header"
        :is-active="selectedIndex === index"
        @click="selectTab(index)"
      />
    </ul>
    <div class="tabsComponent_content">
      <tab-content
        v-for="(tab, index) in fields.Tabs"
        :key="index"
        :is-active="selectedIndex === index"
      >
        <placeholder
          :key="index"
          :name="findPlaceholder(tab?.id)"
          :rendering="rendering"
        />
      </tab-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ComponentRendering,
  Placeholder,
} from "@sitecore-jss/sitecore-jss-vue";
import { computed, ref, onMounted } from "vue";
import TabTitle from "./_TabTitle.vue";
import TabContent from "./_TabContent.vue";

const selectedIndex = ref(0);
const tabContents = ref([]);

const props = defineProps({
  fields: {
    type: Object,
    required: true,
    default: () => {},
  },
  rendering: {
    type: Object as () => ComponentRendering,
    required: true,
    default: () => {},
  },
});

// Retrieve the tabs from the computed property
const tabs = computed(() => get(props, "rendering.placeholders", {}));

/**
 * Finds the correct placeholder containing the tab content based on the tab ID
 * @param {string} id - The ID of the tab to search content for.
 * @returns {string} - The key of the tab containing the placeholder, or null if not found.
 */
function findPlaceholder(id: string): string {
  // Loop through each tab and its data
  for (const [tabKey, tabData] of Object.entries(tabs.value)) {
    // Extract and format the dataSource of the tab
    var tabDataSource = (tabData[0] as ComponentRendering)?.dataSource
      ?.slice(1, -1)
      ?.toUpperCase();

    // Check if the formatted dataSource matches the provided ID
    if (tabDataSource == id.toUpperCase()) {
      // Return the key of the tab when a match is found
      return tabKey;
    }
  }

  // Return null if the placeholder is not found in any tab
  return "";
}

// Function to handle tab selection
const selectTab = (index: number) => {
  selectedIndex.value = index;

  // Update isActive property for each tab content
  tabContents.value.forEach((tab, i) => {
    tab.isActive = i === index;
  });
};

onMounted(() => {
  // Select the initial tab
  selectTab(0);
});
</script>

<style scoped lang="scss">
.tabsComponent {
  background-color: get-color-var("gray", "light");

  &_header {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
  }
}
</style>
