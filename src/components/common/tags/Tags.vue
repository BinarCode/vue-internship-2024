<template>
  <div
    v-for="tag in tags"
    :key="tag"
    class="flex"  
  >
    <Tag :tag="tag"/>
  </div> 
</template>

<script setup lang="ts">
import Tag from "@/components/common/tags/Tag.vue"
import { PropType } from "vue";


const {tags} =defineProps({
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

</script>
