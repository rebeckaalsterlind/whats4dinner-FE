<template>
  <Carousel v-if="isLoggedIn" v-for="category in userCategories" :key="category.categoryId" :category="category" />
</template>

<script setup lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
import { checkLogin } from '~~/helpers.vue';
const store = userStore();
const { userCategories, isLoggedIn } = storeToRefs(store);

// //do i need this??
// const updateComponent = () => {
//   console.log('usercategories in index', userCategories.value);
//   componentKey.value++
// }
// watch(userCategories, updateComponent)
onMounted(() => checkLogin());
</script>
