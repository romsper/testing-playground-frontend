<script setup lang="ts">
import { request } from '@/network/api';
import { API } from '../network/controllers';
import { ref, onMounted, computed } from 'vue'
import type { AllProductsResponse, ProductResponse } from '@/network/products/models';
import { cartStore } from '@/stores/cartStore';

const props = defineProps<{
  offset?: number
  limit?: number
  wrap?: boolean
}>()

const store = cartStore()

const offset = computed(() => props.offset ?? 0)
const limit = computed(() => props.limit ?? 10)

const products = ref<ProductResponse[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

function increment(product: ProductResponse) {
  store.addItem(product)
}

function decrement(product: ProductResponse) {
  store.removeItem(product)
}

function getQty(item: ProductResponse) {
  return store.getItems.filter(i => i.id === item.id).length || 0
}

const images = import.meta.glob('../assets/images/*.png', { eager: true, import: 'default' })
function getProductImage(imageFile: string) {
  for (const path in images) {
    if (path.endsWith('/' + imageFile)) {
      return images[path]
    }
  }
  return ''
}

async function fetchProducts() {
  loading.value = true
  error.value = null
  try {
    const { data, error: apiError } = (await request(API.products.getAllProducts(offset.value, limit.value)));
    if (apiError) {
      error.value = apiError.reason || 'Failed to load products'
      products.value = []
    } else {
      const dataParsed = data as AllProductsResponse;
      products.value = (dataParsed || []).map((product: ProductResponse) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      }))
    }
  } catch (e: any) {
    error.value = e.message
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)

</script>

<template>
    <div class="products-container">
    <div class="products-scroll">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else :class="['products-list', { 'products-list--wrap': props.wrap }]">
        <div
            v-for="product in products"
          :key="product.id"
          class="product-card"
        >
          <img :src="getProductImage('placeholder.png') as string" :alt="product.name" class="product-image" />
          <div class="product-info">
            <div id="card-content" class="product-name">{{ product.name }}</div>
            <div id="card-content" class="product-description">A wonderful {{ product.name.toLowerCase() }} for your daily brew.</div>
            <div id="card-content" class="product-price">${{ product.price }}</div>
            <div id="card-content" class="product-actions">
              <button @click="decrement(product)">-</button>
              <span id="card-content" class="product-qty">{{ getQty(product) }}</span>
              <button @click="increment(product)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.products-scroll {
  width: 100%;
  overflow-x: auto;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.products-list {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: nowrap;
}

.products-list--wrap {
  flex-wrap: wrap;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-width: 200px;
  max-width: 200px;
  width: 100%;
  min-height: 320px;
  box-sizing: border-box;
  flex: 1 1 180px;
  justify-content: flex-start;
}

.product-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: 0.5rem;
  display: block;
}

.product-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
  flex: 1 1 auto;
  position: relative;
}

.product-name {
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-align: left;
  width: 100%;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
}

.product-description {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
}

.product-price {
  color: #2d7a46;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
  margin-top: auto;      
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: space-between;
  margin-top: 0.5rem;      
  margin-bottom: 0.5rem; 
}

.product-actions button {
  width: 28px;
  height: 28px;
  border: none;
  background: #e0e0e0;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.product-actions button:hover {
  background: #bdbdbd;
}

.product-qty {
  min-width: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  color: #333;
}
</style>