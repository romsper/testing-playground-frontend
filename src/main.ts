import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@material/web/all';

const pinia = createPinia().use(piniaPluginPersistedstate);

// Clear localStorage for testing purposes
// localStorage.removeItem('authStore'); 

createApp(App).use(pinia).use(router).mount('#app')
