<script setup lang="ts">
import type { LoginRequest } from '@/network/auth/models';
import { authStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const store = authStore();
const { auth, loading, error } = storeToRefs(store);
const txtError = ref<string>('');

const loginRequest = ref<LoginRequest>({
  email: "",
  password: ""
});

const submitLogin = async () => {
  if (!loginRequest.value.email || !loginRequest.value.password) {
    txtError.value = 'Please enter email and password';
  } else {
    txtError.value = '';
    store.login(loginRequest.value);
  }
};

watch(() => error.value.message, (message) => {
  txtError.value = message ?? '';
})
</script>

<template>
  <div class="dialog-backdrop" @click.self="$emit('close')">
    <div class="dialog">
      <button class="close-btn" @click="$emit('close')" aria-label="Закрыть">&times;</button>
      <div class="title">Login</div>
      <div class="separator"></div>
      <md-outlined-text-field v-model="loginRequest.email" placeholder="Email" />
      <md-outlined-text-field v-model="loginRequest.password" type="password" placeholder="Password" />
      <div class="txt-error">{{ txtError }}</div>
      <div class="separator"></div>
      <md-filled-button class="active-btn" @click="submitLogin">
        <div id="active-btn">Login</div>
      </md-filled-button>
    </div>
  </div>
</template>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  width: 400px;
  background-color: var(--color-background, #fff);
  padding: 36px 36px; 
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;
  z-index: 1000;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #222;
}

.separator {
  width: 100%;
  margin-top: 1rem;
}

</style>