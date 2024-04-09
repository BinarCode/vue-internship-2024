<template>
  <div class="mt-10 flex justify-center">
    <EditPost
      v-if="isModalOpen"
      :post="post"
      @close-modal="isModalOpen = false"
    />
    <div 
      :key="postKey"
      class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <Tags 
        v-if="post?.tags?.length" 
        :tags="post?.tags" 
        class="justify-end" />
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
        <PostActions 
          :post="post" 
          size="2x" 
          @open-modal="isModalOpen = true" />
      </div>
    </div>
  </div>
  <Comments />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePostStore } from "@/modules/auth/store/postStore";
import { computed, ref, watch } from "vue";
import EditPost from "@/components/modal/EditPost.vue";
import Tags from "@/components/common/tags/Tags.vue";
import Author from "@/components/common/author/Author.vue";
import PostActions from "@/components/common/postActions/PostActions.vue";
import Comments from "@/components/comments/Comments.vue";

const postStore = usePostStore();

const route = useRoute();
const postId = computed(() => route.params.id);

const posts = computed(() => postStore.posts);

const post = computed(
  () =>
    posts.value.find((post) => String(post?.id) === String(postId.value)) || {}
);

watch(
  post,
  (newPost) => {
    if ( newPost.id )
    postStore.getComments(post.value);
  },
  { immediate: true }
);

const isModalOpen = ref(false);
</script>

<route lang="yaml">
name: post-id
</route>
