<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ $t("Showing") }}
          {{ " " }}
          <span class="font-medium">{{ page * limit - limit + 1 }}</span>
          {{ " " }}
          {{ $t("to") }}
          {{ " " }}
          <span class="font-medium">{{ limit * page }} </span>
          {{ " " }}
          {{ $t("of") }}
          {{ " " }}
          <span class="font-medium">{{ totalPosts }}</span>
          {{ " " }}
          {{ $t("results") }}
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <BaseButton
            class="ring-1 ring-inset ring-gray-300"
            variant="paginationArrow"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
              @click="previousPage"
            />
          </BaseButton>
          <div>
            <BaseButton
              v-for="pageIndex in totalPages"
              :key="pageIndex"
              :class="{
                'bg-indigo-600 text-white': page === pageIndex,
                'text-gray-400 ring-1 ring-inset ring-gray-300':
                  page !== pageIndex,
              }"
              variant="paginationNumber"
              @click="changePage(pageIndex)"
              >{{ pageIndex }}</BaseButton
            >
          </div>

          <BaseButton
            variant="paginationArrow"
            class="ring-1 ring-inset ring-gray-300"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon
              class="h-5 w-5"
              aria-hidden="true"
              @click="nextPage"
            />
          </BaseButton>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from "@/modules/auth/store/postStore";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@zhuowenli/vue-feather-icons";
import { computed, ref } from "vue";
import BaseButton from "../common/buttons/BaseButton.vue";

const { totalPosts } = defineProps({
  totalPosts: {
    type: Number,
    default: 0,
  },
});

const postStore = usePostStore();

const page = ref(parseInt(localStorage.getItem("currentPage")) || 1);
const limit = computed(() => postStore.posts.limit || 30);
const totalPages = computed(() => Math.ceil(totalPosts / limit.value) || 5);

function changePage(newPage: number) {
  page.value = newPage;
  localStorage.setItem("currentPage", page.value.toString());
  postStore.getPostsByPagination(page.value, limit.value);
}

function nextPage() {
  if (page.value < totalPages.value) {
    changePage(page.value + 1)
  }
}

function previousPage() {
  if (page.value > 1) {
    changePage(page.value - 1)
  }
}
</script>
