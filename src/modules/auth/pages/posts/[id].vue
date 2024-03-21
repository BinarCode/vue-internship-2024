<template>
  <div class="mt-10 flex justify-center">
    <EditPost v-if="isModalOpen" :post="post" @modal-close="closeModal" />
    <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div
        v-if="post?.tags.length"
        class="flex flex-wrap justify-end items-center py-3 text-sm text-white font-medium"
      >
        <span
          v-for="tag in post.tags"
          class="px-2 py-1 font-bold m-1 rounded bg-indigo-500"
        >
          #{{ tag }}
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
      <div class="flex items-center justify-between mt-4">
        <div>
          <a class="flex items-center" href="#">
            <img
              v-if="!currentUser"
              class="mx-4 w-10 h-10 object-cover rounded-full"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />
            <div
              v-else-if="!userImage"
              class="h-8 w-8 rounded-full bg-gray-300 flex justify-center items-center text-center mr-3"
            ></div>
            <img
              v-else
              :src="userImage"
              alt="user-image"
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />

            <h1 v-if="currentUser" class="text-gray-700 font-bold">
              {{ authStore.profile.firstName }} {{ authStore.profile.lastName }}
            </h1>
            <div v-else class="pl-3">
              <div class="font-medium">Jean Marc</div>
            </div>
          </a>
        </div>
        <div v-if="currentUser" class="flex items-center mt-2 gap-10">
          <Edit2Icon @click="openModal" size="2x" class="cursor-pointer" />
          <Trash2Icon
            @click="postStore.deletePost(postId)"
            size="2x"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePostStore } from "@/modules/auth/store/postStore";
import { computed, ref } from "vue";
import { Edit2Icon, Trash2Icon } from "@zhuowenli/vue-feather-icons";
import EditPost from "@/components/modal/EditPost.vue";
import { useAuthStore } from "../../store/authStore";
const postStore = usePostStore();
const authStore = useAuthStore();

const route = useRoute();
const postId = computed(() => route.params.id);

const posts = computed(() => postStore.posts);

const post = computed(() =>
  posts.value.find((post) => String(post.id) === String(postId.value))
);

const userId = computed(() => authStore.profile.id);
const userImage = computed(() => authStore.profile.image);
const currentUser = computed(() => userId.value === post?.value?.userId);

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<route lang="yaml">
name: post-id
</route>
