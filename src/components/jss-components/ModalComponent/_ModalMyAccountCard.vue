<template>
  <form>
    <base-input :name="'email'" :label="emailLabel" class="mb-4" />
    <base-input :name="'password'" :label="passwordLabel" />
    <!--TODO: Change below with kitchen sink component, once it exists-->
    <div class="flex items-center mb-8">
      <input
        id="rememberDevice"
        type="checkbox"
        name="rememberDevice"
        class="cursor-pointer"
      />
      <label class="pl-2 cursor-pointer" for="rememberDevice">{{
        rememberDeviceLabel
      }}</label>
    </div>

    <base-button
      type="submit"
      :label="signInLabel"
      class="w-full uppercase"
      @click="logIn()"
    />
  </form>

  <sc-link
    class="flex justify-end text-black underline"
    :field="forgotPasswordLink"
  />
  <div
    v-if="signUpTitle || signUpText || signUpLink.value?.url"
    class="flex items-center flex-col p-4 mt-2 bg-velux-background-grey"
  >
    <sc-text tag="span" :field="{ value: signUpTitle }" />
    <div>
      <sc-text tag="span" :field="{ value: signUpText }" />
      <sc-link class="text-black underline" :field="signUpLink" />
    </div>
  </div>
</template>

<script setup lang="ts">
import baseButton from "@/components/self-components/FormComponents/BaseButton/BaseButton.vue";
import baseInput from "@/components/self-components/FormComponents/BaseInput/BaseInput.vue";
import ScText from "@/components/sitecore-components/text/ScText.vue";
import { useGlobalStore } from "@/stores/GlobalStore";
import { Link as ScLink } from "@sitecore-jss/sitecore-jss-vue";
import { computed } from "vue";
import { ModalMyAccountCardProps } from "./_ModalMyAccountCard";

const props = withDefaults(defineProps<ModalMyAccountCardProps>(), {
  fields: () => ({
    ForgotPasswordLink: {
      value: {
        href: "",
      },
    },
    RememberDeviceLabel: {
      value: "",
    },
    SignUpTitle: {
      value: "",
    },
    SignUpLink: {
      value: {
        href: "",
      },
    },
    PasswordLabel: {
      value: "",
    },
    SignUpText: {
      value: "",
    },
    EmailLabel: {
      value: "",
    },
    SignInLabel: {
      value: "",
    },
  }),
});

let globalStore = useGlobalStore();

const signInLabel = computed(() => get(props, "fields.SignInLabel.value", ""));
const emailLabel = computed(() => get(props, "fields.EmailLabel.value", ""));
const passwordLabel = computed(() =>
  get(props, "fields.PasswordLabel.value", "")
);
const rememberDeviceLabel = computed(() =>
  get(props, "fields.RememberDeviceLabel.value", "")
);
const forgotPasswordLink = computed(() =>
  get(props, "fields.ForgotPasswordLink", {})
);
const signUpTitle = computed(() => get(props, "fields.SignUpTitle.value", ""));
const signUpText = computed(() => get(props, "fields.SignUpText.value", ""));
const signUpLink = computed(() => get(props, "fields.SignUpLink", {}));

let logIn = () => {
  //TODO: Implement log in
  globalStore.accountInfo.isLoggedIn = true;
};
</script>
