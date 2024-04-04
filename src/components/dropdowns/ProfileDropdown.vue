<template>
  <div class="relative ml-3" @click="toggleMenu">
    <div>
      <button
        class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span class="absolute -inset-1.5" />
        <span class="sr-only">{{ $t("Open user menu") }}</span>

        <img
          v-if="userImage"
          class="h-8 w-8 rounded-full"
          :src="userImage"
          alt="user-image"
        />
        <div
          v-else
          class="h-8 w-8 rounded-full bg-gray-300 flex justify-center items-center text-center"
        >
          {{ initials }}
        </div>
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <BaseButton @click="logoutFunc" variant="secondary" size="sm">
          {{ $t("Sign out") }}
        </BaseButton>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { get } from "lodash-es";
import { computed, ref } from "vue";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { logout } from "@/modules/common/utils/authUtils";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const authStore = useAuthStore();
const userImage = computed(() => authStore.profile?.image);
const initials = computed(() => {
  const { profile } = authStore;
  if (!authStore.profile?.id) {
    return "";
  }
  const firstNameInitial = get(profile, "firstName[0]", "");
  const lastNameInitial = get(profile, "lastName[0]", "");

  return firstNameInitial + lastNameInitial;
});

const logoutFunc = async (): Promise<void> => {
  try {
    logout();
  } catch (error) {
    console.error("Error during logout", error);
  }
};
</script>
