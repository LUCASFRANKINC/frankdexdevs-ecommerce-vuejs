<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 4:57 PM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import { useProducts } from '@/composables/useProducts.ts'
import { computed } from 'vue'
import ButtonDefault from '@/components/ButtonDefault.vue'
import { useStrLimit } from '@/composables/useStrLimit.ts'
import Swal from 'sweetalert2'
import {useRouter} from 'vue-router'

const store = useCartStore()
const router = useRouter()
const { products } = useProducts()
const { limit } = useStrLimit()
/**
 * - Filters products to include only those present in the cart (based on `store.cartObjects`).
 * - Adds a `count` property to each product, representing the quantity in the cart.
 * @returns {Array} List of products in the cart with their respective quantities.
 */
const collectibles = computed(() => {
  const p = products.value.filter((product) => store.cartObjects.has(product.id))
  let total = 0
  p.forEach((x) => {
    x.count = store.cartObjects.get(x.id)
    x.total = Math.ceil(x.price * x.count)
    total += x.total
  })
  console.log(`Total Value: ${total}`)
  return { p, total }
})

function completeCart() {
  Swal.fire({
    confirmButtonText: 'Complete Tutorial',
    title: 'It was a breeze!',
    html: `To learn more, visit the vuejs documentation. For a quickstart, visit <a href="https://laracasts.com" class="underline text-blue-500">Laracasts</a>`
  }).then(result => {
    if (result.isConfirmed) {
      try {
        store.cartObjects.clear()
        router.replace('/products')
      } catch (e: unknown) {
        if (e instanceof Error) console.error(e.message)
      }
    }
  })
}
</script>

<template>
  <div>
    <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div
      v-if="!collectibles.p.length"
      class="bg-orange-400 min-h-40 flex flex-col space-y-4 items-center justify-center max-w-4xl mx-auto rounded-lg text-white font-bold"
    >
      <p>No items added to cart yet!</p>
      <div>
        <ButtonDefault link="/products" text="Browse our Catalog!" />
      </div>
    </div>
    <div
      v-if="collectibles.p.length"
      class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
    >
      <div class="md:w-2/3">
        <div v-for="product in collectibles.p" :key="product.id">
          <div class="rounded-lg">
            <div
              class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                :src="product.image"
                alt="product-image"
                class="h-40 rounded-lg sm:w-20 sm:h-auto"
              />
              <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                  <h2 class="text-lg font-bold text-gray-900" v-text="product.title"></h2>
                  <p
                    class="mt-1 text-xs text-gray-700"
                    v-text="limit(product.description, 100)"
                  ></p>
                </div>
                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div class="flex items-center border-gray-100">
                    <span
                      class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-red-500 hover:text-red-50"
                      @click="store.addObject(product.id, 'negate')"
                    >
                      -
                    </span>
                    <div class="flex relative">
                      <input
                        class="h-8 w-8 border bg-white text-center text-xs outline-none"
                        :value="product.count"
                        title="Use +/- buttons to change value"
                        readonly
                        disabled
                      />
                    </div>

                    <span
                      class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      @click="store.addObject(product.id)"
                    >
                      +
                    </span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <p
                      class="text-sm before:mr-1 before:font-bold before:text-gray-500 before:content-['$']"
                      v-text="product.total"
                    ></p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      @click.once="store.deleteObj(product.id)"
                      class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sub total -->
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">$ {{ Math.ceil(collectibles.total) }}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">$4.99</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">${{ Math.ceil(collectibles.total + 4.99) }} USD</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button
          @click="completeCart"
          class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        >
          Check out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
