<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
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
          <a
            href="#"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
              @click="previousPage"
            />
          </a>
          <div>
            <a
              v-for="pageIndex in totalPages"
              :key="pageIndex"
              href="#"
              :class="{
                'bg-indigo-600 text-white': page === pageIndex,
                'text-gray-400': page !== pageIndex,
              }"
              class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="changePage(pageIndex)"
              >{{ pageIndex }}</a
            >
          </div>

          <a
            href="#"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon
              class="h-5 w-5"
              aria-hidden="true"
              @click="nextPage"
            />
          </a>
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
    page.value += 1;
    localStorage.setItem("currentPage", page.value.toString());
    postStore.getPostsByPagination(page.value, limit.value);
  }
}

function previousPage() {
  if (page.value > 1) {
    page.value -= 1;
    localStorage.setItem("currentPage", page.value.toString());
    postStore.getPostsByPagination(page.value, limit.value);
  }
}
</script>
