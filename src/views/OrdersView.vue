<script setup lang="ts">
import { request } from '@/network/api'
import { API } from '@/network/controllers'
import type { OrderResponse } from '@/network/orders/models'
import { computed, ref } from 'vue'

const loading = ref(false)
const error = ref<string | null>(null)
const orderId = ref<string>('')
const order = ref<OrderResponse | null>(null)

const uniqueOrderProducts = computed(() => {
  if (!order.value) return []
  const map = new Map()
  for (const item of order.value.products) {
    if (map.has(item.id)) {
      map.get(item.id).quantity += 1
    } else {
      // Клонируем объект и добавляем quantity = 1
      map.set(item.id, { ...item, quantity: 1 })
    }
  }
  return Array.from(map.values())
})

async function getOrderById() {
  loading.value = true
  error.value = null
  order.value = null
  try {
    const { data, error: apiError } = await request(API.orders.getOrderById(orderId.value));
    if (apiError) {
      error.value = apiError.reason || 'Failed to get order'
    } else {
      order.value = data as OrderResponse;
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
</script>

<template>
  <div class="spacer"></div>
  <md-outlined-text-field v-model="orderId" placeholder="Order ID" @keydown.enter="getOrderById" />
  <div v-if="error" class="order-error">{{ error }}</div>

  <div v-if="order" class="order-card">
    <div class="order-card-header">
      <div><strong>Order ID:</strong> {{ order.id }}</div>
      <div><strong>Status:</strong> {{ order.orderStatus }}</div>
      <div><strong>Created:</strong> {{ formatDate(order.createdAt.toString()) }}</div>
    </div>
    <div class="order-divider"></div>
    <div class="order-products-list">
  <div class="order-product-row" v-for="product in uniqueOrderProducts" :key="product.id">
    <div class="order-product-name">{{ product.name }}</div>
    <div class="order-product-qty">x{{ product.quantity }}</div>
    <div class="order-product-unit-price">${{ product.price.toFixed(2) }}</div>
    <div class="order-product-price">${{ (product.price * product.quantity).toFixed(2) }}</div>
  </div>
</div>
    <div class="order-divider"></div>
    <div class="order-total-row">
      <span class="order-total-label">Total:</span>
      <span class="order-total-price">${{ getTotal(order).toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped>
.order-error {
  color: red;
  margin-top: 1rem;
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
  font-size: 1.05rem;
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
}

.order-total-price {
  color: #2d7a46;
}
</style>