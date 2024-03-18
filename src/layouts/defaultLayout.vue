<template>
  <Navbar />
  <router-view />
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/modules/auth/store/authStore";
import Navbar from "../components/navbar/Navbar.vue";

const authStore = useAuthStore();
authStore.getUser();
</script>
