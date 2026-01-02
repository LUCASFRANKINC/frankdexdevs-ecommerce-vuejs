<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 4:49 PM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'

const store = useCartStore()
</script>

<template>
  <nav class="relative bg-white">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img
              src="/ebuy-logo.png"
              alt="EBuy by Frank Dex Devs"
              class="h-8 w-auto"
            />
          </div>
          <div class="sm:ml-6">
            <div class="flex items-center space-x-4 text-gray-600">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" -->
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/products">Products</RouterLink>
              <RouterLink to="/cart">Cart<span v-if="store.cartObjects.size" class="rounded-full py-1 px-2 ms-2 bg-yellow-500 text-black">{{ store.cartObjects.size }}</span></RouterLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
          >
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              data-slot="icon"
              aria-hidden="true"
              class="size-6"
            >
              <path
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
