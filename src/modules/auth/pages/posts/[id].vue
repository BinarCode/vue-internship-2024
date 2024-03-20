<template>
  <div class="mt-10 flex justify-center">
    <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div v-if="post?.tags.length" class="flex justify-end gap-3 items-center">
        <span
          v-for="tag in post.tags"
          class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
        >
          {{ tag }}
        </span>
      </div>
      <div class="mt-2">
        <p class="text-2xl text-gray-700 font-bold">
          {{ post?.title }}
        </p>
        <p class="mt-2 text-gray-600">
          {{ post?.body }}
        </p>
      </div>
      <!-- need to get the exact user information -->
      <div class="flex items-center justify-between mt-4">
        <div>
          <a class="flex items-center" href="#">
            <img
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
              alt="avatar"
            />
            <h1 class="text-gray-700 font-bold">User</h1>
          </a>
        </div>
        <div class="flex items-center mt-2 gap-3">
          <Edit2Icon @click="postEdit" class="cursor-pointer" />
          <Trash2Icon @click="postStore.deletePost(postId)" class="cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePostStore } from "@/modules/auth/store/postStore";
import { computed } from "vue";
import { Edit2Icon, Trash2Icon } from "@zhuowenli/vue-feather-icons";

const postStore = usePostStore();

const route = useRoute()
const postId = computed(() => route.params.id)

const posts = computed(() => postStore.posts);

const post = computed(() => posts.value.find((post) => String(post.id) === String(postId.value)))

const postEdit = async (): Promise<void> => {
  try {
    postStore.editPost(postId);
  } catch (error) {
    console.error("Error during edit", error);
  }
};
</script>

<route lang="yaml">
name: post-id
</route>
