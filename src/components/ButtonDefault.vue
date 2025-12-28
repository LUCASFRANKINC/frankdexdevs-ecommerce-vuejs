<!--
  Copyright (c) 2025.
  Last Modified :12/28/25, 9:32 AM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: "Click Here"
    },

    type: {
      type: String,
      default: 'info'
    },
    link: {
      type: String,
      required: true
    }
  });
</script>
<template>
  <router-link :to="props.link" class="grid justify-center items-center py-2 px-4 rounded-2xl text-white max-w-sm text-center" :class="{
    'bg-blue-500  hover:bg-blue-700': props.type === 'info',
    'bg-gray-700  hover:bg-gray-800': props.type === 'primary',
    'bg-green-700 hover:bg-green-800': props.type === 'success'
  }">
    {{ props.text }}
  </router-link>
</template>
