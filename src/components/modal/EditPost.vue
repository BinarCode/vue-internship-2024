<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="bg-white w-3/4 h-3/4 md:w-2/3 md:h-2/3 lg:w-3/4 lg:h-3/4 p-6 rounded-lg shadow-lg text-center"
    >
      <BaseForm :actions="false" @submit="onSubmit()">
        <h1 class="flex justify-center font-bold">{{ $t("Edit Post") }}</h1>

        <div class="flex justify-end items-center mb-4">
          <XIcon
            @click="$emit('modal-close')"
            size="2.5x"
            class="cursor-pointer"
          />
        </div>
        <div>
          <FormKit
            v-model="model.title"
            type="text"
            label="Title"
            validation="length:0,50"
          />
          <FormKit
            v-model="model.body"
            type="textarea"
            label="Content"
            validation="length:0,500"
          />
          <div
            v-if="model?.tags?.length"
            class="flex flex-wrap justify-center gap-3 items-center mt-5 py-3 text-md"
          >
            <span
              v-for="tag in model?.tags"
              :key="index"
              class="px-2 py-1 bg-indigo-500 text-white font-bold rounded flex items-center gap-1"
            >
              #{{ tag }}
              <XIcon @click="removeTag(tag)" class="cursor-pointer" />
            </span>
          </div>
          <div class="grid justify-center mt-5 mb-20">
            <FormKit
              v-model="tagInput"
              :name="$t('Tag')"
              type="text"
              validation="length:0,15"
            />
            <BaseButton @click="addTag" size="xs" variant="primary"
              >{{ $t("+ Add another") }}
            </BaseButton>
          </div>
          <BaseButton type="submit" variant="primary" size="lg">{{
            $t("Edit Post")
          }}</BaseButton>
        </div>
      </BaseForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "@/components/common/form/BaseForm.vue";
import { XIcon } from "@zhuowenli/vue-feather-icons";
import { PropType, ref } from "vue";
import BaseButton from "../common/buttons/BaseButton.vue";
import { PostModel } from "@/modules/common/utils/models";
import { usePostStore } from "@/modules/auth/store/postStore";
import { cloneDeep } from "lodash-es";
import { error } from "../common/NotificationPlugin";
const { post } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    DEFAULT: () => ({}),
  },
});

const emit = defineEmits(["modal-close"]);

const model = ref(cloneDeep(post));
const postStore = usePostStore();

const tagInput = ref<string>("");

function addTag() {
  const newTag = tagInput.value;
  const sameTag = model.value?.tags.includes(tagInput.value);
  if (sameTag) {
    error("Tag exists");
    return;
  }
  if (!newTag) {
    error("No tag to add");
    return;
  }
  model.value?.tags.push(tagInput.value);

  tagInput.value = "";
}

function removeTag(tag: string) {
  const index = model.value?.tags.indexOf(tag);
  if (index !== -1) {
    model.value?.tags.splice(index, 1);
  }
}

function onSubmit() {
  postStore.editPost(model.value);
  emit("modal-close");
}
</script>
