<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ $t("Showing") }}
          {{ " " }}
          <span class="font-medium">{{ firstElement }}</span>
          {{ " " }}
          {{ $t("to") }}
          {{ " " }}
          <span class="font-medium">{{ lastElement }} </span>
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
            :disabled="disablePreviousNavigation"
            class="ring-1 ring-inset ring-gray-300"
            variant="paginationArrow"
            @click="previousPage"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
            />
          </BaseButton>
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
                >{{ pageIndex }}
          </BaseButton>
          <BaseButton
            :disabled="disableNextNavigation"
            variant="paginationArrow"
            class="ring-1 ring-inset ring-gray-300"
            @click="nextPage"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon
              class="h-5 w-5"
              aria-hidden="true"
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

const firstElement = computed(() => page.value * limit.value - limit.value + 1 )
const lastElement = computed(() => limit.value * page.value)

const disableNextNavigation = computed(() => page.value === totalPages.value)
const disablePreviousNavigation = computed(() => page.value === 1)

function changePage(newPage: number) {
  page.value = newPage;
  localStorage.setItem("currentPage", page.value.toString());
  postStore.getPostsByPagination(page.value, limit.value);
}

function nextPage() {
    changePage(page.value + 1)
}

function previousPage() {
    changePage(page.value - 1)
}
</script>
