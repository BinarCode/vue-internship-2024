<template>
  <div class="flex justify-center">
    <EditPost
      v-if="isModalOpen"
      :post="post"
      @close-modal="isModalOpen = false"
      @open-modal="isModalOpen = true"
    />
    <div
      class="overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-90 w-60 md:w-80 cursor-pointer"
    >
      <router-link :to="link" class="w-full block h-full">
        <div class="bg-white w-full p-4 h-full flex flex-col">
          <p class="text-indigo-500 text-2xl font-medium pb-3">
            {{ post?.title }}
          </p>

          <div class="grow flex items-end">
            <p class="text-gray-600 font-light text-md line-clamp-4">
              {{ post?.body }}
            </p>
          </div>
          <div
            class="flex flex-wrap justify-starts items-center py-3 border-b-2 text-xs text-white font-medium"
          >
          <Tags 
            :tags="post?.tags" />
          </div>
          <div class="flex items-center mt-2 justify-between">
            <Author :post="post"/>
            <PostActions 
              :post="post" 
              size="1x"/>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostModel } from "@/modules/common/utils/models";
import { PropType, computed, ref } from "vue";
import EditPost from "@/components/modal/EditPost.vue";
import Tags from "../common/tags/Tags.vue";
import Author from "../common/author/Author.vue";
import PostActions from "@/components/common/postActions/PostActions.vue"

const { post } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: () => ({}),
  },
});

const link = computed(() => `/posts/${post?.id}`);



const isModalOpen = ref(false);
</script>
