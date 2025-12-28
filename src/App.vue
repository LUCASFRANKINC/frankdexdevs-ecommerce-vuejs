<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 7:07 AM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
import NavbarView from '@/components/NavbarView.vue'
</script>

<template>
  <header class="fixed top-0 w-full">
    <NavbarView />
  </header>
  <div
    class="min-h-full border border-gray-100 rounded-4xl bg-pink-100/60 text-black px-4 grid content-around"
  >
    <router-view v-slot="{Component}">
      <Transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </Transition>
    </router-view>
  </div>
</template>
