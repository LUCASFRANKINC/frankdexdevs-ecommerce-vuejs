<!--
  Copyright (c) 2025.
  Last Modified :12/24/25, 1:37 PM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
import BorderView from '@/components/BorderView.vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-gray-600/70 grid place-items-center"
    >
      <div class="bg-white p-4 w-[80vw] max-w-md rounded-md space-y-6">
        <header>
          <slot name="header"> Default Header </slot>
          <BorderView position="bottom" class="pt-3" />
        </header>

        <slot />

        <footer class="mt-4">
          <BorderView position="top" class="pt-3" />
          <slot name="footer" />
          <button
            @click="$emit('close')"
            class="bg-red-700 text-white py-2 px-4 rounded-md float-end"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
