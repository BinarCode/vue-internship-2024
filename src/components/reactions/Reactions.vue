<template>
  <div class="flex gap-2 items-center">
    <p>
      {{ post?.reactions }}
    </p>
    <HeartIcon
      @click.prevent="postStore.handleReactions(post)"
      :size="size"
      :key="post?.reactions + post?.reactedByMe"
      class="cursor-pointer"
      :class="{ 'text-red-500 fill-red-500': post?.reactedByMe }"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
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
