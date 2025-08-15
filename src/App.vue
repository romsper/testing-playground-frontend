<script setup lang="ts">
import HomeView from './views/HomeView.vue';
import Header from './components/Header.vue';

</script>

<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>