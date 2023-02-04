<template>
  <input type="search" class="p-2 rounded-lg bg-white text-prime-normal fit-content grow h-10"
    :placeholder="placeholder">
</template>

<script setup lang="ts">
const { placeholder } = defineProps<{ placeholder: string }>()
</script>