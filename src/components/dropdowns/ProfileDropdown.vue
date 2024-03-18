<template>
  <div class="relative ml-3" @click="toggleMenu">
    <div>
      <button
        class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span class="absolute -inset-1.5" />
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 rounded-full" :src="userImage" alt="" />
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
        <BaseButton @click="logout" variant="secondary" size="sm">
          {{ $t("Sign out") }}
        </BaseButton>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import router from "../../router/router";
import { useAuthStore } from "../../modules/auth/store/authStore";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const authStore = useAuthStore();
const userImage = computed(() => authStore.profile.image);

const logout = async (): Promise<void> => {
  try {
    authStore.logout();
  } catch (error) {
    console.error("Error during logout", error);
  }
};
</script>
