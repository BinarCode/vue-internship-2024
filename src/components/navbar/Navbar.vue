<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center justify-between">
      <div class="flex-shrink-0">
        <RouterLink class="text-white font-bold text-lg" to="/">{{
          $t("Home")
        }}</RouterLink>
      </div>

      <div class="flex gap-5">
        <RouterLink class="text-white text-md" to="/products">{{
          $t("Products")
        }}</RouterLink>
        <RouterLink class="text-white text-md" to="/posts">{{
          $t("Posts")
        }}</RouterLink>
      </div>
      <ProfileDropdown />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import ProfileDropdown from "@/components/dropdowns/ProfileDropdown.vue";
</script>
