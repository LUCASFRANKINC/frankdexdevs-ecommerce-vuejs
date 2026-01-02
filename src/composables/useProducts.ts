/*
 * Copyright (c) 2025.
 * Last Modified :12/28/25, 5:26 PM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */

import type Product from '@/types/products'
import { computed, onBeforeMount, type Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export function useProducts() {
  /** Reactive reference to store the list of products. */
  const products: Ref<Product[]> = ref([])

  /** Reactive reference to store the currently selected category. */
  const categorySelected = ref('all')

  /** Provides access to the current route. */
  const route = useRoute()

  /** Provides navigation capabilities. */
  const router = useRouter()

  /**
   * Fetches products and initializes the selected category based on the route query.
   * Runs before the component is mounted.
   */
  onBeforeMount(async () => {
    products.value = await getProducts()
    categorySelected.value = <string>route.query.category ?? 'all'
  })

  /**
   * Watches for changes in the selected category and updates the route query accordingly.
   * @param nQ - New category value.
   * @param oQ - Old category value.
   */
  watch(categorySelected, (nQ, oQ) =>
     nQ !== oQ && route.name != 'productitem' ? router.replace(`/products?category=${nQ}`) : (categorySelected.value = nQ),
   )

  /**
   * Fetches the list of products from the API.
   * Also, check whether we have an id'd route to fetch a single product.
   * @returns {Promise<Product[]>} The list of products/single product.
   */
  async function getProducts() {
    try {
      const id = route.params.id
      const res =
        ! id
          ? await axios.get('http://localhost:3001/products')
          : await axios.get(`http://localhost:3001/products?id=${id}`)
      return id ? await res.data[0] : await res.data
    } catch (e: unknown) {
      console.error((e as Error).message)
    }
  }

  /** Computed property to generate a list of unique categories from the products. */
  const categories = computed(() => [
    'all',
    ...new Set(products.value.map((item) => item.category)),
  ])

  /** Computed property to filter products based on the selected category. */
  const filteredProducts = computed(() =>
    categorySelected.value === 'all'
      ? products.value
      : products.value.filter((product) => product.category === categorySelected.value),
  )

  return {
    products,
    categories,
    categorySelected,
    filteredProducts,
  }
}
