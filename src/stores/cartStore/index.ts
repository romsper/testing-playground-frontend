import { defineStore } from "pinia";
import type { AllProductsResponse, ProductResponse } from "@/network/products/models";

export const cartStore = defineStore("cartStore", {

  state: () => ({
    items: [] as AllProductsResponse,

  }),

  getters: {
    getItems(state) {
      return state.items
    },
  },

  persist: {
    storage: localStorage,
    paths: ["cart"],
  } as {
    storage: Storage;
    paths: string[];
  },

  actions: {
    getCartItems() {
      return this.items;
    },

    addItem(item: ProductResponse) {
      this.items.push(item);
    },

    removeAllDuplicates(item: ProductResponse) {
      this.items = this.items.filter(i => i.id !== item.id);
    },

    removeItem(item: ProductResponse) {
      const idx = this.items.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        this.items.splice(idx, 1);
      }
    },

    clearCart() {
      this.items = [];
    }
  }

});
