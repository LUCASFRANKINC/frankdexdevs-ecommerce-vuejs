/*
 * Copyright (c) 2025.
 * Last Modified :12/28/25, 12:22 AM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import IndexView from '@/components/products/IndexView.vue'
import ExpandedView from '@/components/products/ExpandedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      component: HomePage,
      name: 'home',
      meta: {
        description: "Welcome to E-Buy Traders",
        title: "HomePage",
      }
    },
    {
      path: "/products",
      component: IndexView,
      name: 'products',
      props: route => ({
        query: route.query.category
      }),
      meta: {
        description: "For all your valuable stocks, surprisingly!",
        title: "E-Buy Products"
      }
    },
    {
      path: '/products/:id',
      component: ExpandedView,
      name: 'productitem',
      meta: {
        description: "Product View",
        title: "Product"
      }
    }
  ],
})

router.beforeEach((to) => {
  const {title, description} = to.meta;
  const defaultTitle = "Welcome to E-Buy Traders";
  const defaultDescription = "Your one-stop shop for online vue learning, seriously!";

  document.title = title ?? defaultTitle
  document.querySelector('head meta[name="description"]')?.setAttribute('content', description ?? defaultDescription)
})

export default router
