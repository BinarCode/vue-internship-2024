<template>
    <BaseTable 
      :data="rowData"
      :columns="colDefs"
      title="Products"
    />
  </template>
  
  <script setup lang="ts">
  import BaseTable from '@/components/common/tables/BaseTable.vue';
  import { PropType, computed, ref } from 'vue';
  import {ProductModel} from "@/modules/common/utils/models";

  const { products } = defineProps({
  products: {
    type: Array as PropType<ProductModel[]>,
    default: () => ([]),
  },
});

const rowData = computed(() => {
  return products.map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
  }));
});

const colDefs = ref([]);

colDefs.value = [
  { field: "id", headerName: "ID" },
  { field: "title", headerName: "Title" },
  { field: "description", headerName: "Description" },
  { field: "price", headerName: "Price" },
  { field: "discountPercentage", headerName: "Discount (%)" },
];
</script>
  
  