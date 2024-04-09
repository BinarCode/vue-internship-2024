<template>
    <ProductsTable :products="products"/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '../../store/productStore';

const productStore = useProductStore();

const products = computed(() => productStore.products)


</script>

<route lang="yaml">
name: Products
</route>