<template>
  <div
    class="flex flex-wrap items-center py-3 text-sm text-white font-medium"
  >
    <div 
      v-for="tag in tags" 
      :key="tag" 
      class="flex">
        <Tag 
          :tag="tag" 
          :is-clearable="isClearable"
          @click="$emit('remove-tag', tag)"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from "@/components/common/tags/Tag.vue";
import { PropType } from "vue";

const { tags, isClearable } = defineProps({
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  isClearable: {
    type: Boolean,
    default: false,
  },
});

</script>
