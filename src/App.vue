<template>
  <Navbar v-if="!$route.meta.hideNavbar" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DEFAULT_APP_TITLE } from "@/modules/common/config";
import Navbar from "./components/navbar/Navbar.vue";

export default defineComponent({
  watch: {
    $route: {
      handler(val, oldval) {
        this.setTitle();
      },
      immediate: true,
    },
  },
  methods: {
    setTitle() {
      document.title = `${String(this.$route.name)} - ${DEFAULT_APP_TITLE}`;
    },
  },
});
</script>
