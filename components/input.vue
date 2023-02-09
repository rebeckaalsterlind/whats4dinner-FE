<template>
  <input type="search"
    class="focus:outline-none p-2 rounded-lg placeholder-white bg-white bg-opacity-10 text-white fit-content grow h-10"
    :placeholder="placeholder">
</template>

<script setup lang="ts">
const { placeholder } = defineProps<{ placeholder: string }>()
</script>