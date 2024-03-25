<template>
  <div class="mt-10 flex justify-center">
    <EditPost
      v-if="isModalOpen"
      :post="post"
      @close-modal="isModalOpen = false"
    />
    <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div
        v-if="post?.tags.length"
        class="flex flex-wrap justify-end items-center py-3 text-sm text-white font-medium"
      >
        <Tags 
          v-for="tag in post.tags" 
          :tag="tag" />
      </div>
      <div class="mt-2">
        <p class="text-2xl text-indigo-500 font-bold break-words">
          {{ post?.title }}
        </p>
        <p class="mt-2 text-gray-600 break-words">
          {{ post?.body }}
        </p>
      </div>
      <div class="flex items-center justify-between mt-4 gap-10">
        <Author :post="post" />
        <PostActions :post="post" />
      </div>
    </div>
  </div>
  <div class="antialiased mx-auto max-w-screen-sm">
    <h3 class="mb-4 text-lg font-semibold text-gray-900">
      {{ $t("Comments") }} ({{ totalComments }})
    </h3>

    <div
      v-if="!totalComments"
      class="text-gray-800 text-center py-4 border-gray-300 rounded-lg"
    >
      {{ $t("No comments yet") }}
    </div>
    <div v-if="comments" class="space-y-4">
      <div v-for="comment in comments" :key="comment.id" class="flex">
        <div class="flex-shrink-0 mr-3">
          <img
            class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            alt=""
          />
        </div>
        <div
          class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
        >
          <strong>Sarah</strong>
          <p class="text-sm">{{ comment?.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePostStore } from "@/modules/auth/store/postStore";
import { computed, ref } from "vue";
import EditPost from "@/components/modal/EditPost.vue";
import Tags from "@/components/common/tags/Tags.vue";
import Author from "@/components/common/author/Author.vue";
import PostActions from "@/components/common/postActions/PostActions.vue";

const postStore = usePostStore();

const route = useRoute();
const postId = computed(() => route.params.id);

const posts = computed(() => postStore.posts);

const post = computed(() =>
  posts.value.find((post) => String(post.id) === String(postId.value))
);

postStore.getComments(post.value);

const comments = computed(() => postStore.comments.data);
const totalComments = computed(() => postStore.totalComments);

const isModalOpen = ref(false);
</script>

<route lang="yaml">
name: post-id
</route>
