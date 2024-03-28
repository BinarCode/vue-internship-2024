<template>
    <div :tag="tag"  class="flex justify-between items-center gap-1 px-2 py-1 font-bold m-1 rounded bg-indigo-500 text-white">
      #{{ tag }}
      <XIcon 
      v-if="isClearable" 
      class="cursor-pointer" 
      :is-clearable="isClearable"
      @click="$emit('remove-tag')" />
    </div>
</template>

<script setup lang="ts">
import { XIcon } from "@zhuowenli/vue-feather-icons";

 const {tag, isClearable} = defineProps({
  tag: {
    type: String,
    default: "",
  },
  isClearable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["remove-tag"]);


</script>
