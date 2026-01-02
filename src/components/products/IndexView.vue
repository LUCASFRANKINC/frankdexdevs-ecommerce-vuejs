<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 9:22 AM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
/**
 * Imports necessary Vue and external libraries.
 * - `computed`, `onBeforeMount`, `ref`, `watch`: Vue Composition API utilities.
 * - `axios`: HTTP client for API requests.
 * - `ItemView`, `ModalView`: Child components used in this view.
 * - `Product`: Type definition for products.
 * - `useRoute`, `useRouter`: Vue Router utilities for route management.
 */
import { ref } from 'vue'
import ItemView from '@/components/products/ItemView.vue'
import ModalView from '@/components/ModalView.vue'
import { useCartStore } from '@/stores/cart.ts'
import { useProducts } from '@/composables/useProducts.ts'
import ButtonDefault from '@/components/ButtonDefault.vue'

/** Reactive reference to control the visibility of the modal. */
const showModal = ref(false)

/** access cart store */
const store = useCartStore()

const { categories, categorySelected, filteredProducts } = useProducts()
</script>

<template>
  <section class="md:py-24">
    <div class="mx-auto max-w-7xl px-4 2xl:px-0">
      <!-- Heading & Filters -->
      <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
        <div>
          <!-- Breadcrumb navigation -->
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <!-- Home icon -->
                  <svg
                    class="me-2.5 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                    />
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <!-- Arrow icon -->
                  <svg
                    class="h-5 w-5 text-gray-400 rtl:rotate-180"
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
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <a
                    href="#"
                    class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                    >Products</a
                  >
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <!-- Arrow icon -->
                  <svg
                    class="h-5 w-5 text-gray-400 rtl:rotate-180"
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
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <span
                    class="ms-1 text-sm font-medium text-gray-500 md:ms-2 capitalize"
                    v-text="categorySelected"
                  ></span>
                </div>
              </li>
            </ol>
          </nav>
          <!-- Page heading -->
          <h2
            class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl capitalize"
            v-text="categorySelected"
          ></h2>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Button to open the filters modal -->
          <button
            type="button"
            class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            @click="showModal = true"
          >
            <!-- Filter icon -->
            <svg
              class="-ms-0.5 me-2 h-4 w-4"
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
                stroke-width="2"
                d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
              />
            </svg>
            Filters
            <!-- Dropdown arrow icon -->
            <svg
              class="-me-0.5 ms-2 h-4 w-4"
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
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="store.cartObjects.size" class="mb-4 max-w-xs">
        <ButtonDefault type="info" link="/cart" text="Go to cart" class="w-[60] right-2 bottom-2 fixed ring-2" />
      </div>
      <!-- Product list -->
      <ItemView :products="filteredProducts" />
      <!-- Modal for filtering products -->
      <teleport to="body">
        <ModalView :show="showModal" @close="showModal = false">
          <template #header>
            <h3 class="font-bold text-xl mb-2">Filter Products</h3>
            <p class="text-gray-600 text-sm">Choose a category to list the products tagged to it</p>
          </template>
          <template #default>
            <form>
              <fieldset class="space-y-3">
                <!-- Radio buttons for category selection -->
                <div v-for="category in categories" :key="category">
                  <input
                    type="radio"
                    name="category"
                    :id="category"
                    :value="category"
                    v-model="categorySelected"
                  />
                  <label class="ms-2 capitalize font-bold text-gray-700" :for="category">{{
                    category
                  }}</label>
                </div>
              </fieldset>
            </form>
          </template>
        </ModalView>
      </teleport>
    </div>
  </section>
</template>
