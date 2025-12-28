/*
 * Copyright (c) 2025.
 * Last Modified :12/28/25, 9:59 AM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartObjects = reactive(new Map())

  function addObject(k: string) {
    if (cartObjects.has(k)) {
      const val = cartObjects.get(k) + 1;
      return cartObjects.set(k, val);
    }
    return cartObjects.set(k, 1);
  }

  return { cartObjects, addObject }
})
