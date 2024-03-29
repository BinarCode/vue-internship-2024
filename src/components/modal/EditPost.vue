<template>
  <BaseModal 
    @close-modal="$emit('close-modal')">

    <PostForm
      v-model:post="model"
      title="Edit Post"
      actionLabel="Edit Post"
      @on-submit="onSubmit"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { PostModel } from "@/modules/common/utils/models";
import { usePostStore } from "@/modules/auth/store/postStore";
import { cloneDeep } from "lodash-es";
import { error } from "@/components/common/NotificationPlugin";
import PostForm from "../common/form/PostForm.vue";


const { post } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
      default: () => ({}),
  },
});

const emit = defineEmits(["close-modal"]);

const model = ref(cloneDeep(post));
const postStore = usePostStore();

function onSubmit() {
  try{
    postStore.editPost(model.value);
    emit("close-modal");
  }catch(err) {
    console.error("Error during editing", err);
    error("Failed to edit");
  }
}
</script>
