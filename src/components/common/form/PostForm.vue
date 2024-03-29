<template>
  <BaseForm 
    :actions="false"
    @submit="$emit('on-submit')">
      <div class="flex items-center justify-center mb-5">
        <h1 class="font-bold">{{ $t(title) }}</h1>
      </div>

      <div>
        <FormKit
          v-model="currentPost.title"
          type="text"
          label="Title"
          validation="required|length:0,50"
        />
        <FormKit
          v-model="currentPost.body"
          type="textarea"
          label="Content"
          validation="required|length:0,500"
        />
        <Tags
          v-model:tags="currentPost.tags"
          :isClearable="true"
          :canAdd="true"
        />
        <BaseButton 
          size="lg" 
          type="submit"
        >
          {{ $t(actionLabel) }}
        </BaseButton>
      </div>
  </BaseForm>
</template>

<script setup lang="ts">
import { PostModel } from "@/modules/common/utils/models";
import { PropType, computed } from "vue";
import Tags from "../tags/Tags.vue";
import BaseButton from "../buttons/BaseButton.vue";
import BaseForm from "./BaseForm.vue";

const props = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: () => ({}),
  },
  title: {
    type: String,
    default: "",
  },
  actionLabel: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["updatePost", "on-submit"]);

const currentPost = computed({
  get() {    
    return props.post;
  },
  set(newValue) {
    emit("updatePost", newValue);
  },
});


</script>
