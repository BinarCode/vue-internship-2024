<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center justify-between">
      <div class="flex-shrink-0">
        <RouterLink class="text-white font-bold text-lg" to="/">{{
          $t("Home")
        }}</RouterLink>
      </div>

      <div class="flex gap-3">
        <RouterLink class="text-white text-md" to="/products">{{
          $t("Products")
        }}</RouterLink>
        <RouterLink class="text-white text-md" to="/posts">{{
          $t("Posts")
        }}</RouterLink>
      </div>

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
            <a
              href="#"
              @click="logout"
              class="block px-4 py-2 text-sm text-gray-700"
              >{{ $t("Sign out") }}</a
            >
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/modules/auth/store/authStore";
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const authStore = useAuthStore();
const userImage = localStorage.getItem("image");

const logout = async (): Promise<void> => {
  try {
    authStore.logout();

    authStore.setLoggedIn(false);
  } catch (error) {
    console.error("Error during logout", error);
  }
};
</script>
