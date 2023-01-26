<template>
  <Carousel v-for="category in defaultCategories" :key="category.categoryId" :category="category" />
</template>

<script setup lang="ts">
import { useCounterStore } from '~~/stores/counter';
import { storeToRefs } from 'pinia';
const store = useCounterStore();
const { userCategories, defaultCategories } = storeToRefs(store);

</script>
