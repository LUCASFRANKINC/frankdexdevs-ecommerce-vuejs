<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 8:46 AM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
import RatingView from '@/components/products/RatingView.vue'
import { useStrLimit } from '@/composables/useStrLimit.ts'
import type Product from '@/types/products'
import { useCartStore } from '@/stores/cart.ts'

const { limit } = useStrLimit()

/** access cart store */
const store = useCartStore()

const props = defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
    <div
      v-for="data in props.products"
      :key="data.id"
      class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
    >
      <div class="h-56 w-full">
        <a href="#">
          <img class="mx-auto h-full dark:hidden" :src="data.image" alt="" />
          <img class="mx-auto hidden h-full dark:block" :src="data.image" alt="" />
        </a>
      </div>
      <div class="pt-6 flex-1 grid">
        <div class="mb-4 flex items-center justify-between gap-4">
          <span
            class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-blue-600"
            v-text="data.category.toUpperCase()"
          >
          </span>

          <div class="flex items-center justify-end gap-1">
            <button
              type="button"
              data-tooltip-target="tooltip-quick-look"
              class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <span class="sr-only"> Quick look </span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-quick-look"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
              data-popper-placement="top"
            >
              Quick look
              <div class="tooltip-arrow" data-popper-arrow=""></div>
            </div>

            <button
              type="button"
              data-tooltip-target="tooltip-add-to-favorites"
              class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only"> Add to Favorites </span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-add-to-favorites"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top"
            >
              Add to favorites
              <div class="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        <router-link
          class="text-lg font-semibold leading-tight text-gray-900 hover:underline"
          :to="`/products/` + data.id"
          >{{ data.title }}</router-link
        >

        <div class="mt-2 flex items-center gap-2">
          <div class="flex items-center" v-for="star in 5" :key="star">
            <RatingView :filled="star <= Math.round(data.rating.rate)" />
          </div>

          <p class="text-sm font-medium text-gray-900" v-text="data.rating.rate"></p>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            ({{ data.rating.count }})
          </p>
        </div>

        <p class="mt-2 flex items-center gap-4" v-text="limit(data.description, 50)"></p>

        <div class="mt-4 flex items-center justify-between gap-4">
          <p class="text-2xl font-extrabold leading-tight text-gray-900">${{ data.price }}</p>

          <button
            type="button"
            @click="store.addObject(data.id, 5)"
            class="inline-flex items-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            <svg
              class="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
