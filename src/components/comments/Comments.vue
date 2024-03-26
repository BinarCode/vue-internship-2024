<template>
     <div class="antialiased mx-auto max-w-screen-sm ">
    <h3 class="mb-4 text-lg font-semibold text-gray-900">
      {{ $t("Comments") }} ({{ totalComments }})
    </h3>

    <div
      v-if="!totalComments"
      class="text-gray-800 text-center py-4 border-gray-300 rounded-lg"
    >
      {{ $t("No comments yet") }}
    </div>
      <Comment 
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        class="space-y-4"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePostStore } from "@/modules/auth/store/postStore";
import Comment from "@/components/comments/Comment.vue"

const postStore = usePostStore();

const comments = computed(() => postStore.comments.data);
const totalComments = computed(() => postStore.totalComments);


</script>
