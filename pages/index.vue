<template>
  <article>
    <Carousel v-for="category in user.categories" :key="category.categoryId" :category="category" />
  </article>

</template>

<script setup lang="ts">
import { useCounterStore } from '~~/stores/counter';
const store = useCounterStore();
const { user } = store;
</script>
