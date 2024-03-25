<template>
    <span class="px-2 py-1 font-bold m-1 rounded bg-indigo-500">
        #{{ tag }}
    </span>
</template>

<script setup lang="ts">


defineProps({
  tag: {
    type: String,
    default: '',
  },
});

</script>
