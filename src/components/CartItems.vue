<script setup lang="ts">
import { cartStore } from '@/stores/cartStore';
import { computed } from 'vue';


const store = cartStore()

const images = import.meta.glob('../assets/images/*.png', { eager: true, import: 'default' })
function getProductImage(imageFile: string) {
    for (const path in images) {
        if (path.endsWith('/' + imageFile)) {
            return images[path]
        }
    }
    return ''
}

function increment(item: any) {
    store.addItem(item)
}

function decrement(item: any) {
    store.removeItem(item)
}

function getQty(item: any) {
    return store.getItems.filter((i: any) => i.id === item.id).length || 0
}

const total = computed(() =>
    uniqueItems.value.reduce((sum, item) => sum + item.price * getQty(item), 0)
)

const uniqueItems = computed(() => {
    const map = new Map()
    for (const item of store.items) {
        if (!map.has(item.id)) {
            map.set(item.id, item)
        }
    }
    return Array.from(map.values())
})

</script>

<template>
    <div class="cart-items-container">
        <div class="cart-item-card" v-for="item in uniqueItems" :key="item.id">
            <img :src="getProductImage('placeholder.png') as string" :alt="item.name" class="cart-item-image" />
            <div class="cart-item-price">${{ (item.price * getQty(item)).toFixed(2) }}</div>
            <button class="cart-remove-btn" @click="store.removeAllDuplicates(item)" aria-label="Close">&times;</button>
            <div class="cart-item-info">
                <div class="cart-item-info-left">
                    <div class="cart-item-name">{{ item.name }}</div>
                    <div class="cart-item-actions">
                        <button @click="decrement(item)">-</button>
                        <span class="cart-item-qty">{{ getQty(item) }}</span>
                        <button @click="increment(item)">+</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-item-card">
            <span class="cart-total-label">Total:</span>
            <span class="cart-item-price cart-total-price">${{ total.toFixed(2) }}</span>
        </div>
        <md-filled-button class="active-btn">
            <div id="active-btn">Checkout</div>
        </md-filled-button>
    </div>
</template>

<style scoped>
.cart-items-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 500px;
}

.cart-item-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fafafa;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 0.75rem 1rem;
    min-width: 260px;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    gap: 1rem;
    position: relative;
}


.cart-item-image {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 8px;
    background: #eee;
    flex-shrink: 0;
}

.cart-item-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
}

.cart-item-name {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    flex: 1 1 auto;
    margin-right: 1rem;
    word-break: break-word;
}

.cart-item-info-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
}

.cart-item-price {
    color: #2d7a46;
    font-weight: bold;
    min-width: 80px;
    text-align: right;
    font-size: 1.1rem;
    align-self: center;      
    margin-left: auto;
    margin-right: 2.5rem;   
    order: 2;
}

.cart-remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: #333;
    cursor: pointer;
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
    line-height: 1;
    transition: color 0.2s;
    z-index: 2;
}

.cart-item-qty {
  min-width: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  color: #333;
}

.cart-item-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
}

.cart-item-actions button {
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

.cart-total-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background: transparent;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 0.5rem;
    gap: 0.5rem;
}

.cart-total-label {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    flex: 1 1 auto;
    margin-right: 1rem;
    word-break: break-word;
}

.cart-item-price {
    color: #2d7a46;
    font-weight: bold;
    min-width: 80px;
    text-align: right;
    font-size: 1.1rem;
    align-self: center;
    margin-left: auto;
    margin-right: 2.5rem;
    order: 2;
}

.cart-total-price {
    margin-right: 0;
}
</style>