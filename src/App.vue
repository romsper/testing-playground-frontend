<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="header">
    <img alt="Logo" class="logo" src="@/assets/logo.svg"/>
    <div class="title">Brew & Bean</div>
    <div class="actions">
      <div class="links">
        <RouterLink id="link" to="/">Products</RouterLink>
        <RouterLink id="link" to="/about">Orders</RouterLink>
        <RouterLink id="link" to="/contact">Contact</RouterLink>
      </div>
      <md-filled-button>
        <RouterLink id="auth" to="/{{ link }}">Registration</RouterLink>
      </md-filled-button>
      <img alt="Avatar" class="avatar" src="@/assets/images/avatar.png"/>
    </div>
  </header>

  <div class="main-image">
    <img src="@/assets/images/main-image.png" alt="Main Image" />
    <div class="main-image-text">Welcome to Brew & Bean</div>
  </div>
</template>

<style scoped>
.header {
  width: 100vw;
  align-items: center;
  padding: 1rem;
  background-color: white;
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

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-left: 1rem;
}

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
</style>
