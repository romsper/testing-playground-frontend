<script setup lang="ts">
import { request } from '@/network/api'
import { API } from '@/network/controllers'
import type { OrderResponse } from '@/network/orders/models'
import { authStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue'

const authPinia = authStore();
const { auth } = storeToRefs(authPinia);

const loading = ref(false)
const error = ref<string | null>(null)
const orderId = ref<string>('')
const orders = ref<OrderResponse[]>([])

function getUniqueOrderProducts(order: OrderResponse) {
  const map = new Map()
  for (const item of order.products) {
    if (map.has(item.id)) {
      map.get(item.id).quantity += 1
    } else {
      map.set(item.id, { ...item, quantity: 1 })
    }
  }
  return Array.from(map.values())
}

async function getOrderById() {
  loading.value = true
  error.value = null
  try {
    const { data, error: apiError } = await request(API.orders.getOrderById(orderId.value));
    if (apiError) {
      error.value = apiError.reason || 'Failed to get order'
    } else {
      orders.value = data ? [data as OrderResponse] : [];
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function getAllUserOrders() {
  loading.value = true
  error.value = null
  try {
    const { data, error: apiError } = await request(API.orders.getUserOrders());
    if (apiError) {
      error.value = apiError.reason || 'Failed to get orders'
    } else {
      orders.value = data as OrderResponse[];
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

function getTotal(order: OrderResponse) {
  return order.totalAmount
}

watch(
  () => auth.value.accessToken,
  (newToken) => {
    if (newToken && newToken.length > 0) {
      getAllUserOrders();
    } else {
      orders.value = [];
    }
  }
);

onMounted(() => {
  if (auth.value.accessToken && auth.value.accessToken.length > 0) {
    getAllUserOrders();
  }
});

</script>

<template>
  <div class="spacer"></div>
  <md-outlined-text-field v-model="orderId" placeholder="Order ID" @keydown.enter="getOrderById" />
  <div v-if="error" class="order-error">{{ error }}</div>

  <div v-if="orders.length > 0" class="orders-list">
      <div v-if="auth.accessToken && auth.accessToken.length > 0" class="title">We found your recent orders</div>
    <div class="order-card" v-for="order in orders" :key="order.id" :data-test-id="`order-card-${order.id}`" data-test-group="order-card">
      <div class="order-card-header">
        <p :data-test-id="`order-id-${order.id}`" data-test-group="order-id">Order ID: {{ order.id }}</p>
        <p :data-test-id="`order-status-${order.id}`" data-test-group="order-status">Status: {{ order.orderStatus }}</p>
        <p :data-test-id="`order-created-${order.id}`" data-test-group="order-created">Created: {{ formatDate(order.createdAt.toString()) }}</p>
      </div>
      <div class="order-divider"></div>
      <div class="order-products-list">
        <div class="order-product-row" v-for="product in getUniqueOrderProducts(order)" :key="product.id" :data-test-id="`order-product-${product.id}`" data-test-group="order-product">
          <div class="order-product-name" :data-test-id="`order-product-name-${product.id}`" data-test-group="order-product-name">{{ product.name }}</div>
          <div class="order-product-qty" :data-test-id="`order-product-qty-${product.id}`" data-test-group="order-product-qty">x{{ product.quantity }}</div>
          <div class="order-product-unit-price" :data-test-id="`order-product-unit-price-${product.id}`" data-test-group="order-product-unit-price">${{ product.price.toFixed(2) }}</div>
          <div class="order-product-price" :data-test-id="`order-product-price-${product.id}`" data-test-group="order-product-price">${{ (product.price * product.quantity).toFixed(2) }}</div>
        </div>
      </div>
      <div class="order-divider"></div>
      <div class="order-total-row">
        <span class="order-total-label">Total:</span>
        <span class="order-total-price" :data-test-id="`order-total-${order.id}`" data-test-group="order-total">${{ getTotal(order).toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-error {
  color: red;
  margin-top: 1rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.order-card {
  width: 100%;
  margin: 2rem auto 0 auto;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 1.5rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.order-card-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  font-size: 1rem;
}

.order-divider {
  width: 100%;
  height: 1px;
  background: #e0e0e0;
  margin: 0.5rem 0;
}

.order-products-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.order-product-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  font-size: 1.05rem;
}

.order-product-name {
  flex: 1 1 60%;
  font-weight: 500;
  color: #333;
  word-break: break-word;
}

.order-product-qty {
  min-width: 36px;
  text-align: center;
  color: #555;
}

.order-product-price {
  min-width: 80px;
  text-align: right;
  color: #2d7a46;
  font-weight: bold;
}

.order-product-unit-price {
  min-width: 80px;
  text-align: right;
  color: #888;
  font-size: 0.98rem;
}

.order-total-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.15rem;
  font-weight: bold;
}

.order-total-label {
  color: #333;
  font-weight: bold;
}

.order-total-price {
  color: #2d7a46;
  font-weight: bold;
}
</style>