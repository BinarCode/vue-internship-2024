<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="relative bg-white w-3/4 h-3/4 md:w-2/3 md:h-2/3 lg:w-3/4 lg:h-3/4 p-6 rounded-lg shadow-lg text-center"
    >
      <slot></slot>
      <XIcon
        size="2.5x"
        class="cursor-pointer absolute right-2 top-0"
        @click="$emit('close-modal')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from "@zhuowenli/vue-feather-icons";

const emit = defineEmits(["close-modal"]);
</script>
