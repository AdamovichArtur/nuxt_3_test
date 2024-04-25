<template>
  <div data-test-id="base-select-id">
    <listbox
      v-slot="{ open }"
      v-model="selectedOptionComputed"
      as="div"
      :class="getLabelPositionClasses"
      :disabled="disabled"
      :multiple="selectMultiple"
    >
      <label
        v-if="label"
        class="min-w-fit mr-2"
        :class="{ 'required-asterisk': required }"
        data-test-id="label-id"
      >
        {{ label }}
      </label>
      <div class="w-full relative">
        <listbox-button
          class="flex justify-between items-center border border-solid text-left pl-2 h-8 w-full element-focus"
          :class="[
            {
              'bg-velux-light-grey bg-opacity-50 opacity-50 border-none cursor-not-allowed':
                disabled,
            },
            {
              'border-velux-light-blue shadow-[0_0_16px_0] shadow-velux-light-blue':
                open,
            },
          ]"
          data-test-id="button-id"
        >
          <sc-text tag="span" :field="{ value: displayOption }" />
          <base-icon
            name="chevron-down-light"
            class="w-5 h-5 mr-1 transition fill-black"
            :class="{ 'rotate-180': open }"
          />
        </listbox-button>

        <listbox-options
          :unmount="false"
          class="border border-solid ml-0 max-h-52 overflow-y-auto absolute w-full"
          data-test-id="options-id"
        >
          <listbox-option
            v-for="option in options"
            :key="getKeyOrValue(options, option, idKey)"
            v-slot="{ active, selected }"
            :value="getKeyOrValue(options, option, itemKey)"
            class="flex"
          >
            <label
              class="flex items-center justify-start w-full"
              :class="{
                'bg-splash-blue text-velux-white': active,
                'bg-velux-white text-velux-black': !active,
                'pl-2': !selectMultiple,
              }"
            >
              <base-icon
                v-if="selectMultiple && !selected"
                name="square-icon"
                class="w-3 h-3 m-1.5"
              />
              <base-icon
                v-if="selectMultiple && selected"
                name="check-square-fill-icon"
                class="w-3 h-3 m-1.5"
              />
              {{ getKeyOrValue(options, option, itemKey) }}
            </label>
            <base-icon
              v-if="!selectMultiple && selected"
              name="x-light"
              class="w-3 h-3 m-1.5 cursor-pointer"
            />
          </listbox-option>
        </listbox-options>
      </div>
    </listbox>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { computed, onMounted, ref, watch } from "vue";
import { type BaseSelectProps } from "./BaseSelect.d";

import BaseIcon from "@/components/self-components/BaseIcon/BaseIcon.vue";
import ScText from "@/components/sitecore-components/text/ScText.vue";

const props = withDefaults(defineProps<BaseSelectProps>(), {
  idKey: "",
  itemKey: "",
  label: "",
  labelPosition: "",
  selectionPrompt: "",
  selectFirstOption: false,
  selectMultiple: false,
  disabled: false,
  required: false,
  toSorted: true,
});

/**
 * Retrieves a specific value from an object based on the provided key.
 * @param {string | Record<string, any>[]} options - Array of options to display in dropdown.
 * @param {string | Record<string, any>} option - Option from array of options.
 * @param {string} key - The key used to access the value in case 'option' is of type object.
 * @returns {*} - The value representing the key or the value used to display items in the dropdown.
 */
function getKeyOrValue(
  options: (string | Record<string, any>)[],
  option: string | Record<string, any>,
  key: string
): string {
  return containsObjects(options) && key ? option[key] : option;
}

/**
 * Checks if the provided array contains objects.
 * @param {string | Record<string, any>[]} options - The array to be checked.
 * @returns {boolean} - True if the array contains objects, false otherwise.
 */
function containsObjects(options: (string | Record<string, any>)[]): boolean {
  if (options?.length > 0) {
    return typeof options[0] == "object";
  }

  return false;
}

// Computed properties for various configuration options
const label = computed(() => get(props, "label", Boolean));
const getLabelPositionClasses = computed(() => get(props, "labelPosition", ""));
const selectionPrompt = computed(() => get(props, "selectionPrompt", ""));
const selectFirstOption = computed(() =>
  get(props, "selectFirstOption", Boolean)
);
const selectMultiple = computed(() => get(props, "selectMultiple", Boolean));
const itemKey = computed(() => get(props, "itemKey", ""));
const options = computed(() => {
  const opts = get(props, "options", []);

  if (containsObjects(opts)) {
    return props.toSorted
      ? (opts as Record<string, any>[])
          ?.slice()
          .sort((a, b) => a[itemKey.value].localeCompare(b[itemKey.value]))
      : opts.slice();
  } else {
    return props.toSorted
      ? (opts as string[])?.slice().sort((a, b) => a.localeCompare(b))
      : opts.slice();
  }
});

const emit = defineEmits(["update:modelValue"]);
const selectedOption = ref(props.modelValue);
const displayOption = ref(props.modelValue);

function restartDropdown() {
  const updatedModelValue = selectMultiple.value ? [] : null;
  emit("update:modelValue", updatedModelValue);
  selectedOption.value = updatedModelValue;
  displayOption.value = updatedModelValue;
}

function updateSelectedOption(newValue) {
  if (newValue === selectedOption.value) {
    restartDropdown();
  } else {
    emit("update:modelValue", newValue);
    const { value: promptValue } = selectionPrompt;
    if (selectMultiple.value) {
      const promptSuffix = promptValue
        ? ` (${newValue.filter((item) => item !== promptValue).length})`
        : "";

      displayOption.value = promptValue
        ? promptValue + promptSuffix
        : newValue.join(", ");
    } else if (newValue[0] === promptValue) {
      displayOption.value = promptValue;
    } else {
      displayOption.value = newValue;
    }
  }
}

const selectedOptionComputed = computed({
  get: () => {
    selectedOption.value;
  },
  set: (val) => {
    updateSelectedOption(val);
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue;
  }
);

watch(selectMultiple, () => restartDropdown());

onMounted(() => {
  const { value: optionsValue } = options;
  const { value: selectFirstOptionValue } = selectFirstOption;

  // Show selection prompt if provided
  if (!selectFirstOptionValue && selectionPrompt.value) {
    displayOption.value = selectionPrompt.value;
  }
  // Select first option
  else if (selectFirstOptionValue && optionsValue.length > 0) {
    const firstOption = optionsValue[0];
    emit("update:modelValue", firstOption);

    containsObjects(optionsValue)
      ? // For array containing objects
        (displayOption.value = firstOption[itemKey.value])
      : // For array not containing objects
        (displayOption.value = firstOption);
  }
});
</script>
