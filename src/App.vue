<script setup lang="ts">
import Header from './components/Header.vue';

</script>

<template>
  <Header />
  <main class="main-container">
    <router-view />
  </main>
</template>

<style scoped>
.main-container {
  max-width: 1024px;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
</style>