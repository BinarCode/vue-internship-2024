<template>
  <div class="flex items-center mt-2 gap-3 ml-5">
    <Reactions 
      :post="post" 
      size="1x" />
    <Edit2Icon 
      v-if="currentUser"
      @click.prevent="isModalOpen = true" />
    <Trash2Icon
      v-if="currentUser"
      @click.prevent="postStore.deletePost(post)"
    />
  </div>
</template>

<script setup lang="ts">
import { Edit2Icon, Trash2Icon } from '@zhuowenli/vue-feather-icons';
import { PostModel } from "@/modules/common/utils/models";
import { PropType, ref, computed } from 'vue';
import { usePostStore } from '@/modules/auth/store/postStore';
import { useAuthStore } from "@/modules/auth/store/authStore";
import Reactions from '@/components/reactions/Reactions.vue';



const { post } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: () => ({}),
  },
});

const postStore = usePostStore();

const authStore = useAuthStore();


const currentUser = ref(false);
const userId = computed(() => authStore.profile.id);

if (userId.value === post?.userId) {
  currentUser.value = true;
}

const isModalOpen = ref(false);



</script>
