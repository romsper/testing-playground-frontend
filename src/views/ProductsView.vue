<script setup lang="ts">
import ProductItems from '@/components/ProductItems.vue';

</script>

<template>
  <div class="spacer" />
  <p class="title" data-test-id="products-title">All Products</p>
  <ProductItems :offset="0" :limit="50" :wrap="true" />
</template>

<style>

</style>
