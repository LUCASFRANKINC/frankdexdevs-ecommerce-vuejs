<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 9:13 AM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
import axios from 'axios'
import { onBeforeMount, onMounted, ref, type Ref } from 'vue'
import type Product from '@/types/products'
import { useRoute } from 'vue-router'
import RatingView from '@/components/products/RatingView.vue'
import { useCounterStore } from '@/stores/counter.ts'

const product: Ref<Product[]> = ref([])
const route = useRoute()
const store = useCounterStore()

async function getProduct(id: number) {
  const res = await axios.get(`http://localhost:3001/products?id=${id}`)
  return await res.data[0]
}

onBeforeMount(async () => {
  product.value = await getProduct(parseInt(<string>route.params.id))
})

onMounted(() => {
  console.log(product.value)
})
</script>

<template>
  <div class="bg-white mt-14">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div class="flex items-center">
              <router-link to="/products" class="mr-2 text-sm font-medium text-gray-900"
                >Products</router-link
              >
              <svg
                viewBox="0 0 16 20"
                width="16"
                height="20"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <router-link
                :to="`/products?category=${product.category}`"
                class="mr-2 text-sm font-medium text-gray-900 capitalize"
                >{{ product.category }}</router-link
              >
              <svg
                viewBox="0 0 16 20"
                width="16"
                height="20"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>

          <li class="text-sm">
            <router-link
              :to="`/products/${product.id}`"
              class="font-medium"
              aria-current="page"
              >{{ product.title }}</router-link
            >
          </li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div class="mx-auto mt-6 max-w-md sm:px-6 lg:px-8">
        <img
          :src="product.image"
          :alt="product.title"
          class="size-full object-cover sm:rounded-lg"
        />
      </div>

      <!-- Product info -->
      <div
        class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24"
      >
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
            v-text="product.title"
          ></h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p
            class="text-3xl tracking-tight text-gray-900 before:mr-0.5 before:text-indigo-600 before:content-['$']"
            v-text="product.price"
          ></p>

          <!-- Reviews -->
          <div class="mt-6">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center" v-for="star in 5" :key="star">
                <RatingView :filled="star <= Math.ceil(product?.rating?.rate)" />
              </div>
              <p class="sr-only">{{ product?.rating?.rate }} out of 5 stars</p>
              <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >{{ parseInt(product?.rating?.count) }} reviews</a
              >
            </div>
          </div>

          <form class="mt-10">
            <button
              @click="store.increment()"
              type="button"
              class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              Add to Cart
            </button>
          </form>
        </div>

        <div
          class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16"
        >
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900" v-text="product.description">
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

            <div class="mt-4">
              <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li class="text-gray-400">
                  <span class="text-gray-600">Hand cut and sewn locally</span>
                </li>
                <li class="text-gray-400">
                  <span class="text-gray-600">Dyed with our proprietary colors</span>
                </li>
                <li class="text-gray-400">
                  <span class="text-gray-600">Pre-washed &amp; pre-shrunk</span>
                </li>
                <li class="text-gray-400">
                  <span class="text-gray-600">Ultra-soft 100% cotton</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Details</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600" v-text="product.description">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
