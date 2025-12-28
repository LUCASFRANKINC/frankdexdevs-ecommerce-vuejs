<!--
  Copyright (c) 2025.
  Last Modified :12/22/25, 1:45 PM.
  Frank Dex Devs.
  All rights Reserved to Lucas Francis K.
  -->

<script setup lang="ts">
  defineProps({
    position: {
      type: String,
      required: true,
    }
  })
</script>

<template>
  <div class="border-gray-100"
       :class="{
    'border-b': position === 'bottom',
    'border-t': position === 'top',
    'border-r': position === 'right',
    'border-l': position === 'left'
       }"
  ></div>
</template>

<style scoped></style>
