<template>
     <div 
        class="flex">
          <div class="flex-shrink-0 mr-3">
            <img
              class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt=""
            />
          </div>
          <div
            class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
          >
            <strong>Sarah</strong>
            <p class="text-sm">{{ comment?.body }}</p>
          </div>
      </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { CommentsModel } from "@/modules/common/utils/models";


const { comment } = defineProps({
  comment: {
    type: Object as PropType<CommentsModel>,
    default: () => ({}),
  },
});


</script>
