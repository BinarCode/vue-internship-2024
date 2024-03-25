<template>
  <span :tag="tag"  class="px-2 py-1 font-bold m-1 rounded bg-indigo-500">
    #{{ tag }}
    <XIcon 
      v-if="isClearable" 
      class="cursor-pointer" 
      @click="removeTag" />
  </span>
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

const removeTag = () => {
  emit("remove-tag");
}
</script>
