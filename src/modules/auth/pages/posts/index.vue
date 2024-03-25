<template>
  <div class="flex justify-end mt-5 mr-5">
    <BaseButton @click="isModalOpen = true" size="md" variant="third"
      >{{ $t("+ Add Post") }}
    </BaseButton>
  <div class="flex flex-wrap gap-10 justify-center mt-10">
    <Card v-for="post in visiblePosts" :key="post.id" :post="post" />
  </div>
  <div class="flex flex-wrap gap-x-10 gap-y-20 justify-center mt-10 mb-10">
    <AddPost
      v-if="isModalOpen"
      :post="post"
      @close-modal="isModalOpen = false"
    />

    <Card 
      v-for="post in visiblePosts"
      :key="post.id" 
      :post="post" />
  </div>
  <Pagination 
    :limit="limit" 
    :total-posts="totalPosts" />
</div>

</template>

<script lang="ts" setup>
import { PropType, computed, ref } from "vue";
import { usePostStore } from "@/modules/auth/store/postStore";
import Card from "@/components/card/Card.vue";
import { PostModel } from "@/modules/common/utils/models";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import AddPost from "@/components/modal/AddPost.vue";
import Pagination from "@/components/pagination/Pagination.vue";

defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: () => ({}),
  },
});

const postStore = usePostStore();
const visiblePosts = computed(() => postStore.visiblePosts);
const limit = computed(() => postStore.limitPosts);
const totalPosts = computed(() => postStore.totalPosts);

const isModalOpen = ref(false);
</script>

<route lang="yaml">
name: Posts
</route>
