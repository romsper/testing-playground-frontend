<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import LoginItem from './LoginItem.vue';

const showDialog = ref(false);
</script>

<template>
    <header class="header">
        <RouterLink to="/" class="logo-title-row">
      <img alt="Logo" class="logo" src="@/assets/logo.svg"/>
      <div class="title">Brew & Bean</div>
    </RouterLink>
    <div class="actions">
      <div class="links">
        <RouterLink id="link" to="/products">Products</RouterLink>
        <RouterLink id="link" to="/about">Orders</RouterLink>
        <RouterLink id="link" to="/contact">Contact</RouterLink>
      </div>
      <md-filled-button class="active-btn" @click="showDialog = true">
        <div id="active-btn">Registration</div>
      </md-filled-button>
      <img alt="Avatar" class="avatar" src="@/assets/images/avatar.png"/>
    </div>
  </header>

  <LoginItem v-if="showDialog" @close="showDialog = false" />
</template>

<style scoped>
.logo-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
}

.header {
  width: 100vw;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  border-bottom: gainsboro solid 0.5px;
}

.header .actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 2rem;
}

.header .links {
  display: flex; 
  gap: 2rem;
  font-size: 1.2rem;
}

#link {
  color: #333;
  font-size: 1rem;
  font-weight: bold;
}

#auth {
  color: #333;
  font-size: 1rem;
  font-weight: bold;
}

.header .logo {
  height: 40px;
  width: 40px;
}

.header .avatar {
  height: 60px;
  width: 60px;
}
</style>
