<template>
  <div class="mt-10 flex justify-center">
    <EditPost v-if="isModalOpen" :post="post" @modal-close="closeModal" />
    <div
      class="overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto"
    >
      <router-link :to="'/posts/' + post?.id" class="w-full block h-full">
        <div class="bg-white w-full p-4">
          <p class="text-indigo-500 text-2xl font-medium pb-3">
            {{ post?.title }}
          </p>

          <p class="text-gray-600 font-light text-md line-clamp-4">
            {{ post?.body }}
          </p>
          <div
            class="flex flex-wrap justify-starts items-center py-3 border-b-2 text-xs text-white font-medium"
          >
            <span
              v-for="tag in post?.tags"
              class="m-1 px-2 py-1 rounded bg-indigo-500"
            >
              #{{ tag }}
            </span>
          </div>

          <div class="flex items-center mt-2 justify-between">
            <div class="flex items-center mt-2">
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
                class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                alt="user-image"
              />
              <h1 v-if="currentUser" class="text-gray-700 font-bold">
                {{ authStore.profile.firstName }}
                {{ authStore.profile.lastName }}
              </h1>
              <div v-else class="pl-3">
                <div class="font-medium">Jean Marc</div>
              </div>
            </div>
            <div v-if="currentUser" class="flex items-center mt-2 gap-3">
              <Edit2Icon @click.prevent="openModal" />
              <Trash2Icon @click.prevent="postStore.deletePost(post?.id)" />
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostModel } from "@/modules/common/utils/models";
import { Edit2Icon, Trash2Icon } from "@zhuowenli/vue-feather-icons";
import { PropType, computed, ref } from "vue";
import { usePostStore } from "@/modules/auth/store/postStore";
import EditPost from "@/components/modal/EditPost.vue";
import { useAuthStore } from "@/modules/auth/store/authStore";

const { post } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    DEFAULT: () => ({}),
  },
});

const postStore = usePostStore();
const authStore = useAuthStore();

const currentUser = ref(false);
const userId = computed(() => authStore.profile.id);

const userImage = computed(() => authStore.profile.image);
if (userId.value === post?.userId) {
  currentUser.value = true;
}

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
</script>
