<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia';
import { authStore } from '@/stores/auth';
import CreateDialog from './dialogs/CreateUserDialog.vue';
import LoginDialog from './dialogs/LoginDialog.vue';
import CartItems from './CartItems.vue';
import { cartStore } from '@/stores/cartStore';

const authPinia = authStore();
const cartPinia = cartStore()

const { auth } = storeToRefs(authPinia);
const btnAuthText = ref('Join');

const showCreateDialog = ref(false)
const showLoginDialog = ref(false)

const showCart = ref(false)
const cartPopupRef = ref<HTMLElement | null>(null)

function openLoginDialog() {
  showCreateDialog.value = false
  showLoginDialog.value = true
}

function handleClickOutside(event: MouseEvent) {
  if (showCart.value && cartPopupRef.value && !cartPopupRef.value.contains(event.target as Node)) {
    showCart.value = false;
  }
}

onMounted(() => {
  btnAuthText.value = auth.value.accessToken ? 'Logout' : 'Join';
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

watch(() => auth.value.accessToken, (token) => {
  btnAuthText.value = token ? 'Logout' : 'Join';
  if (token) {
    showCreateDialog.value = false
    showLoginDialog.value = false;
  }
});

function handleAuthClick() {
  if (auth.value.accessToken) {
    authPinia.logout();
  } else {
    showCreateDialog.value = true;
  }
}
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo-title-row">
      <img alt="Logo" class="logo" src="@/assets/logo.svg" />
      <div class="title">Brew & Bean</div>
    </RouterLink>
    <div class="actions">
      <div class="links">
        <RouterLink id="nav-link" to="/products">Products</RouterLink>
        <RouterLink id="nav-link" to="/orders" v-if="auth.accessToken">Orders</RouterLink>
        <RouterLink id="nav-link" to="/contact">Contact</RouterLink>
        <div class="cart-link-wrapper">
          <button class="cart-link-btn" id="nav-link" to="" @click.prevent="showCart = !showCart">
            Cart
            <span class="cart-badge" v-if="cartPinia.getItems.length > 0">{{ cartPinia.getItems.length }}</span>
          </button>
          <div v-if="showCart" class="cart-popup" ref="cartPopupRef">
            <div v-if="cartPinia.getItems.length > 0">
              <CartItems />
            </div>
            <div v-else class="empty-cart">Empty cart</div>
          </div>
        </div>
      </div>
      <md-filled-button :class="auth.accessToken ? 'disabled-btn' : 'active-btn'" @click="handleAuthClick">
        <div id="active-btn">{{ btnAuthText }}</div>
      </md-filled-button>
      <img v-if="auth.accessToken" alt="Avatar" class="avatar" src="@/assets/images/avatar.png" />
    </div>
  </header>

  <CreateDialog v-if="showCreateDialog" @close="showCreateDialog = false" @open-login="openLoginDialog" />
  <LoginDialog v-if="showLoginDialog" @close="showLoginDialog = false" />
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

#nav-link {
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
  height: 60px;
  width: 60px;
}

.header .avatar {
  height: 60px;
  width: 60px;
}

.cart-link-wrapper {
  position: relative;
  display: inline-block;
}

.cart-link-btn {
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -16px;
  background: #2d7a46;
  color: #fff;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  font-size: 0.95rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  z-index: 1;
}

.cart-popup {
  position: absolute;
  top: 130%;
  right: 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  min-width: 260px;
  z-index: 10;
  padding: 1rem;
  border: 1px solid #e0e0e0;
}

.empty-cart {
  padding: 1rem;
  text-align: center;
  color: #888;
}
</style>
