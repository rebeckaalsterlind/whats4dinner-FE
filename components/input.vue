<template>
  <input type="search" class=" p-2 rounded-lg bg-white bg-opacity-10 w-60 block" :placeholder="placeholder">
</template>

<script setup lang="ts">
const { placeholder } = defineProps<{ placeholder: string }>()
</script>