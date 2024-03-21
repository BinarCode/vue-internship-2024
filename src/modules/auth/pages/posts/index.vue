<template>
  <div class="flex flex-wrap gap-10 justify-center mt-10">
    <Card
      v-for="post in visiblePosts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { usePostStore } from "@/modules/auth/store/postStore";
import Card from "@/components/card/Card.vue";

const postStore = usePostStore();
const visiblePosts = computed(() => postStore.visiblePosts);
</script>

<route lang="yaml">
name: Posts
</route>
