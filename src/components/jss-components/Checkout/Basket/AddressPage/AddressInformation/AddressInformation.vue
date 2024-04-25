<template>
  <div class="w-full">
    <div class="flex-1 flex-row w-1/2">
      <div>
        <sc-text :field="billingHeadline" tag="h3" />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="firstNameBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="firstNameBillingField.RegularExpression"
          :name="'firstName'"
          :use-placeholder="false"
          :required="true"
          :label="firstNameBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="lastNameBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="lastNameBillingField.RegularExpression"
          :name="'lastName'"
          :use-placeholder="false"
          :required="true"
          :label="lastNameBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="telephoneBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="telephoneBillingField.RegularExpression"
          :name="'telephone'"
          :use-placeholder="false"
          :required="true"
          :label="telephoneBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="mobileBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="mobileBillingField.RegularExpression"
          :name="'mobile'"
          :use-placeholder="false"
          :required="true"
          :label="mobileBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="emailBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="emailBillingField.RegularExpression"
          :name="'email'"
          :use-placeholder="false"
          :required="true"
          :label="emailBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="reEnterEmailBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="reEnterEmailBillingField.RegularExpression"
          :name="'reenteremail'"
          :use-placeholder="false"
          :required="true"
          :label="reEnterEmailBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="houseNumberBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="houseNumberBillingField.RegularExpression"
          :name="'housenumber'"
          :use-placeholder="false"
          :required="true"
          :label="houseNumberBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street1BillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street1BillingField.RegularExpression"
          :name="'street1'"
          :use-placeholder="false"
          :required="true"
          :label="street1BillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street2BillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street2BillingField.RegularExpression"
          :name="'street2'"
          :use-placeholder="false"
          :required="true"
          :label="street2BillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street3BillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street3BillingField.RegularExpression"
          :name="'street3'"
          :use-placeholder="false"
          :required="true"
          :label="street3BillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street4BillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street4BillingField.RegularExpression"
          :name="'street4'"
          :use-placeholder="false"
          :required="true"
          :label="street4BillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="cityBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="cityBillingField.RegularExpression"
          :name="'city'"
          :use-placeholder="false"
          :required="true"
          :label="cityBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="postCodeBillingEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="postCodeBillingField.RegularExpression"
          :name="'postcode'"
          :use-placeholder="false"
          :required="true"
          :label="postCodeBillingField.Label"
        />
      </div>
      <div class="mt-4">
        <input
          id="differentDeliveryAddress"
          type="checkbox"
          name="differentDeliveryAddress"
          @click="handleDeliveryAddressClick"
        />
        <label class="pl-2 cursor-pointer" for="differentDeliveryAddress"
          >{{ differentDeliveryAddress.value }}
        </label>
      </div>
    </div>
    <div v-show="showDeliveryAddress" class="flex-1 flex-row w-1/2 mt-4">
      <div>
        <sc-text :field="deliveryHeadline" tag="h3" />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="firstNameDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="firstNameDeliveryField.RegularExpression"
          :name="'firstName'"
          :use-placeholder="false"
          :required="true"
          :label="firstNameDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="lastNameDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="lastNameDeliveryField.RegularExpression"
          :name="'lastName'"
          :use-placeholder="false"
          :required="true"
          :label="lastNameDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="telephoneDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="telephoneDeliveryField.RegularExpression"
          :name="'telephone'"
          :use-placeholder="false"
          :required="true"
          :label="telephoneDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="mobileDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="mobileDeliveryField.RegularExpression"
          :name="'mobile'"
          :use-placeholder="false"
          :required="true"
          :label="mobileDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="emailDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="emailDeliveryField.RegularExpression"
          :name="'email'"
          :use-placeholder="false"
          :required="true"
          :label="emailDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="reEnterEmailDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="reEnterEmailDeliveryField.RegularExpression"
          :name="'reenteremail'"
          :use-placeholder="false"
          :required="true"
          :label="reEnterEmailDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="houseNumberDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="houseNumberDeliveryField.RegularExpression"
          :name="'housenumber'"
          :use-placeholder="false"
          :required="true"
          :label="houseNumberDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street1DeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street1DeliveryField.RegularExpression"
          :name="'street1'"
          :use-placeholder="false"
          :required="true"
          :label="street1DeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street2DeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street2DeliveryField.RegularExpression"
          :name="'street2'"
          :use-placeholder="false"
          :required="true"
          :label="street2DeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street3DeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street3DeliveryField.RegularExpression"
          :name="'street3'"
          :use-placeholder="false"
          :required="true"
          :label="street3DeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="street4DeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="street4DeliveryField.RegularExpression"
          :name="'street4'"
          :use-placeholder="false"
          :required="true"
          :label="street4DeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="cityDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="cityDeliveryField.RegularExpression"
          :name="'city'"
          :use-placeholder="false"
          :required="true"
          :label="cityDeliveryField.Label"
        />
      </div>
      <div class="mt-4">
        <base-input
          v-model:userInput="postCodeDeliveryEntry"
          type="text"
          validation-marker-type="icon"
          :pattern="postCodeDeliveryField.RegularExpression"
          :name="'postcode'"
          :use-placeholder="false"
          :required="true"
          :label="postCodeDeliveryField.Label"
        />
      </div>
    </div>
    <!-- couldn't figure out to set the ref for each base-input if looping through the fields, needs investigation
    <div v-for="billingField in billingFields" class="mt-4">
      <base-input
        :v-model:userInput="billingField.Label"
        :type="billingField.KeyboardLayout"
        validationMarkerType="icon"
        :pattern="billingField.RegularExpression"
        :name="toCamelCase(billingField.Label)"
        :use-placeholder="true"
        :label="billingField.Label"
      />
    </div>-->
    <div>
      <vlx-button
        class="mt-4 w-full"
        data-test-id="button-test-id"
        :label="proceedButtonLinkText"
        :is-bottom-indent="false"
        size="medium"
        :style-importance="'primary'"
        :chevron="true"
        :button-type="'submit'"
        @click="saveAddresses()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import VlxButton from "@/components/self-components/FormComponents/BaseButton/BaseButton.vue";
import baseInput from "@/components/self-components/FormComponents/BaseInput/BaseInput.vue";

import ScText from "@/components/sitecore-components/text/ScText.vue";
import BASKET from "@/constants/basketConstants";
import { dataFetcher } from "@/dataFetcher";
import { useGlobalStore } from "@/stores/GlobalStore";
import { getBasketCookie } from "@/utils/composables/cookieManager";
import { replaceTokensInString } from "@/utils/stringUtils";

import {
  AddressField,
  AddressInformationProps,
  TextField,
} from "./AddressInformation";
import { Address, AddressProps } from "./AddressInformationRequest.d";

const props = withDefaults(defineProps<AddressInformationProps>(), {
  fields: () => ({
    BillingHeadline: {
      value: "",
    },
    DeliveryHeadline: {
      value: "",
    },
    DifferentDeliveryAddress: {
      value: "",
    },
    ChangeAddressLinkText: {
      value: "",
    },
    ButtonGotoPayment: {
      value: {
        href: "",
      },
    },
    ErrorMessage: {
      value: "",
    },
    HouseNumber: {
      value: "",
    },
    PostalCode: {
      value: "",
    },
    AddressLinkText: {
      value: "",
    },
    SelectYourAddress: {
      value: "",
    },
    CannotFindAddressOption: {
      value: "",
    },
    ProceedButtonLink: {
      value: {
        href: "",
      },
    },
    BillingFields: [],
    DeliveryFields: [],
  }),
});

const globalStore = useGlobalStore();

const billingHeadline = computed<TextField>(() =>
  get(props, "fields.BillingHeadline", { value: "" })
);
const deliveryHeadline = computed<TextField>(() =>
  get(props, "fields.DeliveryHeadline", { value: "" })
);
const differentDeliveryAddress = computed<TextField>(() =>
  get(props, "fields.DifferentDeliveryAddress", { value: "" })
);
const changeAddressLinkText = computed<TextField>(() =>
  get(props, "fields.ChangeAddressLinkText", { value: "" })
);
const errorMessage = computed<TextField>(() =>
  get(props, "fields.ErrorMessage", { value: "" })
);
const houseNumber = computed<TextField>(() =>
  get(props, "fields.HouseNumber", { value: "" })
);
const postalCode = computed<TextField>(() =>
  get(props, "fields.PostalCode", { value: "" })
);
const addressLinkText = computed<TextField>(() =>
  get(props, "fields.AddressLinkText", { value: "" })
);
const selectYourAddress = computed<TextField>(() =>
  get(props, "fields.SelectYourAddress", { value: "" })
);
const cannotFindAddressOption = computed<TextField>(() =>
  get(props, "fields.CannotFindAddressOption", { value: "" })
);
const proceedButtonLinkText = computed<string>(() =>
  get(props, "fields.ProceedButtonLink.value.text", "")
);
const proceedButtonLink = computed<string>(() =>
  get(props, "fields.ProceedButtonLink.value.href", "")
);

const billingFields = computed<Array<AddressField>>(() =>
  get(props, "fields.BillingFields", [])
);
const deliveryFields = computed<Array<AddressField>>(() =>
  get(props, "fields.DeliveryFields", [])
);

const firstNameBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "FirstName")
);
const firstNameBillingEntry = ref("");
const lastNameBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "LastName")
);
const lastNameBillingEntry = ref("");
const telephoneBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Telephone")
);
const telephoneBillingEntry = ref("");
const mobileBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Cellphone")
);
const mobileBillingEntry = ref("");
const emailBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Email")
);
const emailBillingEntry = ref("");
const reEnterEmailBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Email2")
);
const reEnterEmailBillingEntry = ref("");
const houseNumberBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "HouseNumber")
);
const houseNumberBillingEntry = ref("");
const street1BillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Street1")
);
const street1BillingEntry = ref("");
const street2BillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Street2")
);
const street2BillingEntry = ref("");
const street3BillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Street3")
);
const street3BillingEntry = ref("");
const street4BillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "Street4")
);
const street4BillingEntry = ref("");
const cityBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "City")
);
const cityBillingEntry = ref("");
const postCodeBillingField = computed<AddressField>(() =>
  billingFields.value.find((field) => field.Name === "ZipCode")
);
const postCodeBillingEntry = ref("");

const firstNameDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "FirstName")
);
const firstNameDeliveryEntry = ref("");
const lastNameDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "LastName")
);
const lastNameDeliveryEntry = ref("");
const telephoneDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Telephone")
);
const telephoneDeliveryEntry = ref("");
const mobileDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Cellphone")
);
const mobileDeliveryEntry = ref("");
const emailDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Email")
);
const emailDeliveryEntry = ref("");
const reEnterEmailDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Email2")
);
const reEnterEmailDeliveryEntry = ref("");
const houseNumberDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "HouseNumber")
);
const houseNumberDeliveryEntry = ref("");
const street1DeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Street1")
);
const street1DeliveryEntry = ref("");
const street2DeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Street2")
);
const street2DeliveryEntry = ref("");
const street3DeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Street3")
);
const street3DeliveryEntry = ref("");
const street4DeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "Street4")
);
const street4DeliveryEntry = ref("");
const cityDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "City")
);
const cityDeliveryEntry = ref("");
const postCodeDeliveryField = computed<AddressField>(() =>
  deliveryFields.value.find((field) => field.Name === "ZipCode")
);
const postCodeDeliveryEntry = ref("");

let showDeliveryAddress = ref(false);

const saveAddresses = () => {
  const billingAddress: AddressProps = {
    FirstName: firstNameBillingEntry.value,
    LastName: lastNameBillingEntry.value,
    Co: "",
    Title: "",
    Telephone: telephoneBillingEntry.value,
    Cellphone: mobileBillingEntry.value,
    Password: "",
    Email: emailBillingEntry.value,
    Email2: reEnterEmailBillingEntry.value,
    HouseNumber: houseNumberBillingEntry.value,
    ZipCode: postCodeBillingEntry.value,
    Street1: street1BillingEntry.value,
    Street2: street2BillingEntry.value,
    Street3: street3BillingEntry.value,
    Street4: street4BillingEntry.value,
    City: cityBillingEntry.value,
    County: "",
    Country: "",
    Company: "",
    Tax1: "",
    Tax2: "",
    Tax4: "",
    PECEmail: "",
    TelephonePrefix: "",
    CellPhonePrefix: "",
    Vat: "",
    IsPickup: false,
    YourProjectReference: "",
    LongDeliveryInstruction: "",
    LegalForm: "",
  };

  const deliveryAddress: AddressProps = {
    FirstName: firstNameDeliveryEntry.value,
    LastName: lastNameDeliveryEntry.value,
    Co: "",
    Title: "",
    Telephone: telephoneDeliveryEntry.value,
    Cellphone: mobileDeliveryEntry.value,
    Password: "",
    Email: emailDeliveryEntry.value,
    Email2: reEnterEmailDeliveryEntry.value,
    HouseNumber: houseNumberDeliveryEntry.value,
    ZipCode: postCodeDeliveryEntry.value,
    Street1: street1DeliveryEntry.value,
    Street2: street2DeliveryEntry.value,
    Street3: street3DeliveryEntry.value,
    Street4: street4DeliveryEntry.value,
    City: cityDeliveryEntry.value,
    County: "",
    Country: "",
    Company: "",
    Tax1: "",
    Tax2: "",
    Tax4: "",
    PECEmail: "",
    TelephonePrefix: "",
    CellPhonePrefix: "",
    Vat: "",
    IsPickup: false,
    YourProjectReference: "",
    LongDeliveryInstruction: "",
    LegalForm: "",
  };

  const addressData: Address = {
    basketId: basketCookieData?.basketId,
    billingAddress: billingAddress,
    deliveryAddress: deliveryAddress,
  };

  console.log(addressData);

  processAddresses(addressData);

  window.location.href = proceedButtonLink.value;
};

const getSaveAddressesUrl = (url: string): string => {
  const tokens = {
    SHOPNAME: globalStore.siteName,
  };

  return replaceTokensInString(url, tokens);
};

const basketCookieData = getBasketCookie(BASKET.BASKET);

const processAddresses = (addresses: Address) => {
  return new Promise((resolve, reject) => {
    const requestUrl = getSaveAddressesUrl(BASKET.API.SAVE_ADDRESSES);

    dataFetcher(requestUrl, addresses)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject();
      })
      .finally(() => {});
  });
};

const handleDeliveryAddressClick = () => {
  showDeliveryAddress.value = !showDeliveryAddress.value;
};
</script>
