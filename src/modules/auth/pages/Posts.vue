<template>
    <router-view/>
</template>

<script lang="ts" setup>
import { usePostStore } from "@/modules/auth/store/postStore";
import { ref } from "vue";

const limit = ref(30);
const page = ref(parseInt(localStorage.getItem('currentPage')) || 1)

const postStore = usePostStore();
postStore.getPostsByPagination(page.value,limit.value);
</script>

<route lang="yaml">
name: Posts template
</route>