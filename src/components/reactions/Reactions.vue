<template>
  <div class="flex gap-2 items-center">
    <p>
      {{ post?.reactions }}
    </p>
    <HeartIcon
      :size="size"
      :key="Boolean(post?.reactedByMe)"
      class="cursor-pointer"
      :class="{ 'text-red-500 fill-red-500': post?.reactedByMe }"
      @click.prevent="postStore.handleReactions(post)"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType, computed } from "vue";
import { PostModel } from "@/modules/common/utils/models";
import { usePostStore } from "@/modules/auth/store/postStore";
import { HeartIcon } from "@zhuowenli/vue-feather-icons";

const { post, size } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: () => ({}),
  },
  size: {
    type: String,
    default: "2x",
  },
});

const postStore = usePostStore();
</script>
