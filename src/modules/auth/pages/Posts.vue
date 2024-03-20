<template>
    <router-view/>
</template>

<script lang="ts" setup>
import { usePostStore } from "@/modules/auth/store/postStore";

const postStore = usePostStore();
postStore.getAllPosts();
</script>
