<template>
    <div>
          <div class="flex items-center">
            <img
              v-if="!currentUser"
              class="mx-4 w-10 h-10 object-cover rounded-full"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />
            <div
              v-else-if="!profile.image"
              class="h-8 w-8 rounded-full bg-gray-300 flex justify-center items-center text-center mr-3"
            ></div>
            <img
              v-else
              :src="profile.image"
              alt="user-image"
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h1 v-if="currentUser" class="text-gray-700 font-bold">
              {{profileName}}
            </h1>
            <div v-else class="pl-3">
              <div class="font-medium">Jean Marc</div>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store/authStore";
import { PropType, computed } from "vue";
import { PostModel } from "@/modules/common/utils/models";


const { post } = defineProps({
  post: {
    type: Object as PropType<PostModel>,
    default: () => ({}),
  },
});

const authStore = useAuthStore();

const profile = computed(()=> authStore.profile)

const currentUser = computed(() => profile.value.id === post?.userId);

const profileName = computed(() => profile.value?.firstName + ' ' + profile.value?.lastName)



</script>
