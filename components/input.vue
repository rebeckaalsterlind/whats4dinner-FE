<template>
  <input type="text" class="border px-2 rounded bg-white my-4 w-60 block" :placeholder="placeholder">
</template>

<script setup lang="ts">

const { placeholder } = defineProps<{ placeholder: string }>()
</script>