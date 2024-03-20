<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ $t("Sign in to your account") }}
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseForm :actions="false" :submit-label="$t('Sign In')" @submit="login">
        <FormKit
          v-model="model.username"
          type="text"
          :label="$t('Username')"
          :placeholder="$t('Enter your email')"
          validation="required"
          validation-visibility="dirty"
        />

        <FormKit
          v-model="model.password"
          type="password"
          :label="$t('Password')"
          :placeholder="$t('Enter your password')"
          validation="required|length:5"
          validation-visibility="dirty"
          :classes="{
            outer: 'w-full',
            input: 'w-full',
          }"
        />

        <BaseButton type="submit" variant="primary" size="xs">{{
          $t("Sign In")
        }}</BaseButton>
      </BaseForm>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { error } from "@/components/common/NotificationPlugin";
import router from "../../../router/router";
import { useAuthStore } from "../store/authStore";
import { LoginModel } from "@/modules/common/utils/models";
import BaseButton from "@/components/common/buttons/BaseButton.vue";

const model = reactive<LoginModel>({
  username: "",
  password: "",
});

const authStore = useAuthStore();

const login = async (): Promise<void> => {
  try {
    await authStore.login(model);

    router.push("/");
  } catch (error) {
    console.error("Error during login", error);
  }
};
</script>

<route lang="yaml">
name: Login
meta:
  layout: authLayout
</route>
