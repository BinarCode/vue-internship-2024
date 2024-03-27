<template>
  <div :key="userId" class="flex items-center mt-2 gap-3 ml-5">
    <Reactions 
      :post="post" 
      :size="size" />
    <Edit2Icon
      v-if="currentUser"
      :size="size"
      class="cursor-pointer"
      @click="$emit('open-modal')"
    />
    <Trash2Icon
      v-if="currentUser"
      :size="size"
      class="cursor-pointer"
      @click="postStore.deletePost(post)"
    />
  </div>
</template>

<script setup lang="ts">
import { Edit2Icon, Trash2Icon } from "@zhuowenli/vue-feather-icons";
import { PostModel } from "@/modules/common/utils/models";
import { PropType, computed } from "vue";
import { usePostStore } from "@/modules/auth/store/postStore";
import { useAuthStore } from "@/modules/auth/store/authStore";
import Reactions from "@/components/reactions/Reactions.vue";

const { post, size } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: null,
  },
  size: {
    type: String,
    default: "",
  },
});

const postStore = usePostStore();

const authStore = useAuthStore();

const userId = computed(() => authStore?.profile?.id);
const currentUser = computed(() => userId.value === post?.userId);

defineEmits(["open-modal"]);
</script>
