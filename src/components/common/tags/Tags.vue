<template>
  <div>
  <div class="flex flex-wrap justify-center items-center py-3 text-sm text-white font-medium">
      <Tag
        v-for="tag in currentTags"
        :key="tag"
        :tag="tag"
        :is-clearable="isClearable"
        @remove-tag="removeTag(tag)"
      />
  </div>
  <div 
    v-if="canAdd"
    class="grid justify-center mt-5 mb-20">
    <FormKit
      v-model="tagInput"
      :name="$t('Tag')"
      label="Add Tag"
      type="text"
      validation="length:0,15"
    />
    <BaseButton size="xs" @click="addTag"
      >{{ $t("+ Add another") }}
    </BaseButton>
  </div>
</div>
</template>

<script setup lang="ts">
import Tag from "@/components/common/tags/Tag.vue";
import { PropType, computed, ref, watch } from "vue";
import { error } from "../NotificationPlugin";

const {canAdd, tags, isClearable } = defineProps({
  canAdd:{
    type: Boolean,
    default: false
  },
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  isClearable: {
    type: Boolean,
    default: false,
  },
});


const tagInput = ref<string>("");

const emit = defineEmits(["updateTags"]);

const currentTags = computed({
  get() {    
    return tags;
  },
  set(newValue) {
    emit("updateTags", newValue);
  },
});

function addTag() {
  const newTag = tagInput.value;
  if (!newTag) {
    error("No tag to add");
    return;
  }
  const sameTag = currentTags.value.includes(tagInput.value);
  if (sameTag) {
    error("Tag exists");
    return;
  }
  currentTags.value.push(tagInput.value);

  tagInput.value = "";
}

function removeTag(tag: string) {
  const index = currentTags.value.indexOf(tag); 
  if (index !== -1) {
    currentTags.value.splice(index, 1);
  }
}

</script>
