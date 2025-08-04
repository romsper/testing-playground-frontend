<script setup lang="ts">
import ProductItems from '@/components/ProductItems.vue';
</script>

<template>
  <div class="main-image">
    <img src="@/assets/images/main-image.png" alt="Main Image" />
    <div class="main-image-text">Welcome to Brew & Bean</div>
  </div>

  <ProductItems />
</template>

<style scoped>
.main-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 360px;
  border-radius: 15px;
  overflow: hidden;
  margin: 1rem auto;
  max-width: 1024px;
  background: #fff;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image-text {
  position: absolute;
  left: 16px;
  bottom: 16px;
  color: #fff;
  font-weight: bold;
  background: rgba(0,0,0,0.5);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1.5rem;
  pointer-events: none;
}

.loading, .error {
  padding: 1rem;
  color: #888;
}
</style>
