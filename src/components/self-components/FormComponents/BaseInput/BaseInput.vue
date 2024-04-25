<template>
  <div data-test-id="base-input-id" class="w-full">
    <label
      v-if="label && !usePlaceholder"
      data-test-id="label-id"
      :class="{ 'required-asterisk': required }"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        ref="inputRef"
        :type="type"
        :disabled="disabled"
        :name="name"
        :pattern="pattern"
        :placeholder="label && usePlaceholder ? label : ''"
        class="outline-none w-full p-2 border placeholder:text-14 sm:placeholder:text-16 element-focus"
        :class="[
          { 'bg-velux-background-grey cursor-not-allowed': disabled },
          validationMarkerType === 'none' && isFieldValid !== null
            ? getDataBasedOnValidationField(
                'border-velux-splash-green',
                'border-velux-red'
              )
            : 'border-velux-light-grey',
        ]"
        :value="userInput"
        data-test-id="input-test-id"
        @input="checkInputIsProvided"
      />
      <div
        v-if="validationMarkerType !== 'none' && isFieldValid !== null"
        class="absolute right-1 top-1.5 w-6 text-center"
        :class="[
          getDataBasedOnValidationField(
            'text-velux-splash-green after:content-checkmark',
            'text-velux-red after:content-x'
          ),
          validationMarkerType === 'round'
            ? getDataBasedOnValidationField(
                'text-velux-white bg-velux-splash-green rounded-full after:w-4',
                'text-velux-white bg-velux-red rounded-full after:w-4'
              )
            : '',
        ]"
        data-test-id="validation-marker-id"
      />
      <sc-text
        tag="span"
        data-test-id="validation-label-id"
        :field="{
          value: getDataBasedOnValidationField(validLabel, invalidLabel),
        }"
        :class="
          getDataBasedOnValidationField(
            'text-velux-splash-green',
            'text-velux-red'
          )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ScText from "@/components/sitecore-components/text/ScText.vue";
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";
import { BaseInputProps } from "./BaseInput.d";

let isFieldValid = ref(null);
const fieldTouched = ref(false);
const inputRef = ref(null);

const props = withDefaults(defineProps<BaseInputProps>(), {
  name: "", // The name attribute value
  type: "text", // This could be any of the available text-type fields
  label: "", // The label explaining the field purpose
  usePlaceholder: false, // If we should show the label inside the field instead of above
  required: false, // If this is a required field
  pattern: "", // A regex pattern for validation of the format
  validLabel: "", // A text showing if the validation is successful
  invalidLabel: "", // A text showing if the validation is unsuccessful
  disabled: false, // If the field should be disabled
  validationMarkerType: "none", // Defaults to none - an be 'icon', 'round' or 'none'
});

const emit = defineEmits(["update:isValid", "update:userInput"]);

const pattern = computed(() => get(props, "pattern", ""));

function checkInputIsProvided() {
  fieldTouched.value = true;
  let target = inputRef.value;
  emit("update:userInput", target.value);

  // If the input is deleted, the validation message disappears
  if (target.value.length == 0) {
    isFieldValid.value = null;
    emit("update:isValid", isFieldValid.value);
  }
}

// Validation on input occurs only after the user clicks outside the input field
onClickOutside(inputRef, () => {
  fieldTouched.value = false;

  if (pattern.value) {
    let target = inputRef.value;
    isFieldValid.value = target.value.length > 0 ? target.validity.valid : null;
  }

  emit("update:isValid", isFieldValid.value);
});

/**
 * Determines the appropriate action based on the validation state
 * @param {string} actionOnValid - action when the field is valid
 * @param {string} actionOnInvalid - action when the field is invalid
 * @returns {string} - The determined action based on validation state
 */
function getDataBasedOnValidationField(
  actionOnValid: string,
  actionOnInvalid: string
): string {
  const { value: isFieldValidValue } = isFieldValid;

  return isFieldValidValue
    ? actionOnValid
    : isFieldValidValue === false
    ? actionOnInvalid
    : "";
}
</script>
