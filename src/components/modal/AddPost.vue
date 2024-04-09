<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="bg-white w-3/4 h-3/4 md:w-2/3 md:h-2/3 lg:w-3/4 lg:h-3/4 p-6 rounded-lg shadow-lg text-center"
    >
      <BaseForm 
        :actions="false" 
        @submit="onSubmit"
      >
        <div class="flex relative items-center justify-center mb-5">
          <h1 class="font-bold">{{ $t("Add Post") }}</h1>
          <XIcon
            size="2.5x"
            class="cursor-pointer absolute right-2"
            @click="$emit('close-modal')"
          />
        </div>

        <div>
          <FormKit
            v-model="newPost.title"
            type="text"
            label="Title"
            validation="required|length:0,50"
          />
            <FormKit
              v-model="newPost.body"
              type="textarea"
              label="Content"
              validation="required|length:0,500"
            />
            <Tags 
              v-if="newPost?.tags?.length"
              :tags="newPost.tags"
              :isClearable="true"
              class="justify-center"
              @remove-tag="removeTag"
            />
            <div class="grid justify-center mt-5 mb-20">
              <FormKit
                v-model="tagInput"
                :name="$t('Tag')"
                label="Add Tag"
                type="text"
                validation="length:0,15"
              />
              <BaseButton  
                size="xs" 
                @click="addTag"
                  >{{ $t("+ Add another") }}
              </BaseButton>
            </div>
            <BaseButton 
              type="submit" 
              size="lg">{{
                $t("Add New Post")
            }}</BaseButton>
          </div>
      </BaseForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "@/components/common/form/BaseForm.vue";
import { XIcon } from "@zhuowenli/vue-feather-icons";
import BaseButton from "../common/buttons/BaseButton.vue";
import { usePostStore } from "@/modules/auth/store/postStore";
import { error } from "../common/NotificationPlugin";
import { useAuthStore } from "@/modules/auth/store/authStore";
import Tags from "../common/tags/Tags.vue";
import { ref } from "vue";


const emit = defineEmits(["close-modal"]);

const newPost = ref({
  title: "",
  body: "",
  userId: 0,
  tags: [],
  reactions: 0,
});

const postStore = usePostStore();
const authStore = useAuthStore();

const tagInput = ref<string>("");

function addTag() {
  const newTag = tagInput.value;
  if (!newTag) {
    error("No tag to add");
    return;
  }
  const sameTag = newPost.value.tags.includes(tagInput.value);
  if (sameTag) {
    error("Tag exists");
    return;
  }
  newPost.value.tags.push(tagInput.value);

  tagInput.value = "";
}

function removeTag(tag: string) {
  const index = newPost.value.tags.indexOf(tag);
  if (index !== -1) {
    newPost.value.tags.splice(index, 1);
  }
}

function onSubmit() {
  try {
    postStore.addPost(authStore.profile.id, newPost.value);
    emit("close-modal");
  } catch (err) {
    console.error("Error during editing", err);
    error("Failed to edit");
  }
}
</script>
