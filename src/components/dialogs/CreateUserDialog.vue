<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { API } from '../../network/controllers';
import { authStore } from '../../stores/auth';
import type { LoginRequest } from '../../network/auth/models';
import { request } from '../../network/api';
import type { ErrorResponse } from '../../network/types';
import type { CreateRequest, CreateResponse } from '../../network/users/models';

const store = authStore();
const { error } = storeToRefs(store);
const txtError = ref<string>('');

const loginRequest = ref<LoginRequest>({
  email: "",
  password: ""
});

const createUserRequest = ref<CreateRequest>({
  username: "",
  email: "",
  password: ""
});

const submitCreateUser = async () => {
  if (!createUserRequest.value.username || !createUserRequest.value.email || !createUserRequest.value.password) {
    txtError.value = 'Please enter username, email and password';
  } else {
    const { data, error } = (await request(API.users.postCreate(createUserRequest.value)));
    if (error) {
      const errorResponse = error as ErrorResponse;
      console.error('Error creating user:', error);
      txtError.value = errorResponse.reason || 'An error occurred while creating the user';
    } else {
      const dataParsed = data as CreateResponse;
      console.log('User created successfully:', dataParsed);
      store.login({
        email: createUserRequest.value.email,
        password: createUserRequest.value.password
      });
      txtError.value = '';
    }
  };
}

watch(() => error.value.reason, (message) => {
  txtError.value = message ?? '';
})

</script>

<template>
  <div class="dialog-backdrop" @click.self="$emit('close')">
    <div class="dialog">
      <button class="close-btn" data-test-id="create-close" @click="$emit('close')" aria-label="Закрыть">&times;</button>
      <div data-test-id="create-title" class="title">Create Account</div>
      <div>If you already have an account, please log in to <span class="login-link" data-test-id="create-login" @click="$emit('open-login')">your account</span>.</div>
      <div class="separator"></div>
      <md-outlined-text-field v-model="createUserRequest.username" data-test-id="create-username" placeholder="Username" />
      <md-outlined-text-field v-model="createUserRequest.email" data-test-id="create-email" placeholder="Email" />
      <md-outlined-text-field v-model="createUserRequest.password" data-test-id="create-password" type="password" placeholder="Password" />
      <div class="txt-error" data-test-id="create-error">{{ txtError }}</div>
      <div class="separator"></div>
      <md-filled-button data-test-id="create-submit" class="active-btn" @click="submitCreateUser">
        <div id="active-btn">Create User</div>
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
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;
  z-index: 1000;
  position: relative;
}

.login-link {
  color: #2d7a46;
  cursor: pointer;
  text-decoration: underline;
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