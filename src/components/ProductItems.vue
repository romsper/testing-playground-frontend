<script setup lang="ts">
import { request } from '@/network/api';
import { API } from '../network/controllers';
import { ref, onMounted } from 'vue'
import type { AllProductsResponse, ProductResponse } from '@/network/products/models';

interface Product {
  id: number
  name: string
  image: string
  price: number
}

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const quantities = ref<Record<number, number>>({})

function increment(id: number) {
  quantities.value[id] = (quantities.value[id] || 0) + 1
}
function decrement(id: number) {
  if ((quantities.value[id] || 0) > 0) {
    quantities.value[id]--
  }
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
    const { data, error: apiError } = (await request(API.products.getAllProducts(0, 5)));
    if (apiError) {
      error.value = apiError.message || 'Failed to load products'
      products.value = []
    } else {
      const dataParsed = data as AllProductsResponse;
      products.value = (dataParsed || []).map((product: ProductResponse) => ({
        id: product.id,
        name: product.name,
        image: 'placeholder.png',
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

// onMounted(async () => {
//   loading.value = true
//   try {
//     // Replace the URL with your backend endpoint
//     // const res = await fetch('http://localhost:3000/api/products')
//     // if (!res.ok) throw new Error('Failed to fetch products')
//     products.value = products.value = [
//       { id: 1, name: 'Coffee Beans', image: 'placeholder.png', price: 12.99 },
//       { id: 2, name: 'Espresso Machine', image: 'placeholder.png', price: 299.99 },
//       { id: 3, name: 'French Press', image: 'placeholder.png', price: 19.99 },
//       { id: 4, name: 'Coffee Mug', image: 'placeholder.png', price: 9.99 },
//       { id: 5, name: 'Tea Leaves', image: 'placeholder.png', price: 8.99 },
//       { id: 6, name: 'Coffee Grinder', image: 'placeholder.png', price: 49.99 },
//       { id: 7, name: 'Milk Frother', image: 'placeholder.png', price: 29.99 },
//       { id: 8, name: 'Coffee Filter', image: 'placeholder.png', price: 5.99 },
//       { id: 9, name: 'Tea Kettle', image: 'placeholder.png', price: 24.99 },
//       { id: 10, name: 'Coffee Scale', image: 'placeholder.png', price: 15.99 }
//     ]
//   } catch (e: any) {
//     error.value = e.message
//   } finally {
//     loading.value = false
//   }
// })
</script>

<template>
    <div class="products-container">
    <p class="title">Products</p>
    <div class="products-scroll">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="products-list">
        <div
            v-for="product in products.slice(0, 5)"
          :key="product.id"
          class="product-card"
        >
          <img :src="getProductImage(product.image) as string" :alt="product.name" class="product-image" />
          <div class="product-info">
            <div id="card-content" class="product-name">{{ product.name }}</div>
            <div id="card-content" class="product-description">A wonderful {{ product.name.toLowerCase() }} for your daily brew.</div>
            <div id="card-content" class="product-price">${{ product.price }}</div>
            <div id="card-content" class="product-actions">
              <button @click="decrement(product.id)">-</button>
              <span id="card-content" class="product-qty">{{ quantities[product.id] || 0 }}</span>
              <button @click="increment(product.id)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  padding: 48px 0; 
  position: relative;
  width: 100%;
  margin: 1rem auto;
  max-width: 1024px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Ensure left alignment */
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
  /* Prevent wrapping so it scrolls horizontally */
  flex-wrap: nowrap;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 0 0 1rem;
  min-width: 180px;
  max-width: 200px;
  /* Remove align-items if you want full width for children */
}

#card-content {
  padding: 0 1rem;
}

.product-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 0.5rem;
  align-self: stretch;
  display: block;
}

.product-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.product-name {
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-align: left;
  width: 100%;
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
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: space-between;
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