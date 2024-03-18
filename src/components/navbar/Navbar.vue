<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center justify-between">
      <div class="flex-shrink-0">
        <RouterLink class="text-white font-bold text-lg" to="/"
          >Home</RouterLink
        >
      </div>

      <div class="flex gap-3">
        <RouterLink class="text-white text-md" to="/products"
          >Products</RouterLink
        >
        <RouterLink class="text-white text-md" to="/posts">Posts</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>
