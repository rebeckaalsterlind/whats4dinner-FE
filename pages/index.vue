<template>
  <Carousel v-if="isLoggedIn" v-for="category in defaultCategories" :key="category.categoryId" :category="category" />
</template>

<script setup lang="ts">
import { useCounterStore } from '~~/stores/counter';
import { storeToRefs } from 'pinia';
import { checkLogin } from '~~/helpers.vue';
const store = useCounterStore();
const { defaultCategories, isLoggedIn } = storeToRefs(store);
onMounted(() => checkLogin());
</script>
