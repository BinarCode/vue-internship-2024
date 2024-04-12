<template>
  <BaseTable 
    :data="rowData"
    :columns="colDefs"
  />
</template>

<script setup lang="ts">
import BaseTable from '@/components/common/tables/BaseTable.vue';
import { ref } from 'vue';


const rowData = ref([
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
]);

const colDefs = ref([
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
]);


</script>
