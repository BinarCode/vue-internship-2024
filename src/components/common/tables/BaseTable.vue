<template>
  <div>
    <div class="flex items-center mb-2">
      <div class="text-lg font-bold ml-5">
        {{ $t(title) }}
      </div>
      <div class="flex items-center pt-2 relative mx-auto text-gray-600 mr-5">
        <input
          v-model="quickFilterText"
          class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
        <SearchIcon class="absolute right-0 top-0 mt-5 mr-4 cursor-pointer" />
      </div>
    </div>

    <ag-grid-vue
      :row-data="data"
      :column-defs="columns"
      :defaultColDef="defaultColDef"
      style="height: 500px"
      class="ag-theme-quartz"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from "@zhuowenli/vue-feather-icons";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridVue } from "ag-grid-vue3"; // AG Grid Component
import { ref, watch } from "vue";

const { title, data, columns } = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  data: {
    type: Array,
    default: [],
  },
  columns: {
    type: Array,
    default: [],
  },
});

const defaultColDef = ref({
  flex: 1,
});

let gridApi: any;

function onGridReady(params: any) {
  gridApi = params.api;
}

const quickFilterText = ref('');

watch(quickFilterText, (newValue) => {
  if (gridApi) {
    gridApi.setQuickFilter(newValue);
  }
});
</script>
