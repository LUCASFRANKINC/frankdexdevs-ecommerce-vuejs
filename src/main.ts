/*
 * Copyright (c) 2025.
 * Last Modified :12/19/25, 1:50 AM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

await router.isReady()
app.mount('#app')
