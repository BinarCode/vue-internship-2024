<template>
  <router-view />
</template>

<script lang="ts">
import { useProductStore } from '../store/productStore';


const productStore = useProductStore();

productStore.getProducts();
</script>

<route lang="yaml">
name: Products template
</route>
