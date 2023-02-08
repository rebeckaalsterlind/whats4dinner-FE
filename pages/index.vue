<template>
  <PageTitle label="My meals" />
  <section v-if="user && user.meals.length < 1">
    <h4 class="text-center">You have no meals added yet!</h4>
    <NuxtLink to="/add-meal" class="flex justify-center mt-6">
      <ButtonSecondary label="Add meal?" />
    </NuxtLink>
  </section>
  <section v-else>
    <Carousel v-if="customLists" v-for="(list, index) in customLists" :key="index" :customList="list" />
    <Carousel v-if="user" v-for="category in userCategories" :key="category.categoryId" :category="category" />
  </section>
</template>

<script setup lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
import { checkLogin } from '~~/helpers.vue';
const store = userStore();
const { userCategories, customLists, user } = storeToRefs(store);
onMounted(() => checkLogin());
</script>
