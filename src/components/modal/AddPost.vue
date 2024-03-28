<template>
  <BaseModal
    @close-modal="$emit('close-modal')">

    <PostForm
      v-model:post="newPost" 
      title="Add Post"
      actionLabel="Add New Post"
      @on-submit="onSubmit" 
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { usePostStore } from "@/modules/auth/store/postStore";
import { error } from "@/components/common/NotificationPlugin";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";
import PostForm from "../common/form/PostForm.vue";

const emit = defineEmits(["close-modal"]);

const newPost = ref({
  title: "",
  body: "",
  userId: 0,
  tags: [],
  reactions: 0,
});

const postStore = usePostStore();
const authStore = useAuthStore();

function onSubmit() {
  try {
    postStore.addPost(authStore.profile.id, newPost.value);
    emit("close-modal");
  } catch (err) {
    console.error("Error during editing", err);
    error("Failed to edit");
  }
}
</script>
