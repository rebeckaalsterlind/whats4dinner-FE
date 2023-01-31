<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10">
    <h2 class="font-bold text-lg  text-accent-normal">{{ capitalize(selectedMeal.title) }}</h2>
    <section class="my-4" v-if="selectedMeal.picture">
      <PhotoIcon class="w-40 h-40 text-white" />
    </section>
    <section class="my-4">
      <h5 class="font-semibold">Key ingredients: </h5>
      <ul class="flex">
        <Pill v-for="(keyword, key) in selectedMeal.keywords" :key="key" :label="capitalize(keyword)" />
      </ul>
    </section>

    <section class="my-4">
      <h5 class="font-semibold">Categories:</h5>
      <ul class="flex">
        <Pill v-for="category in selectedMeal.categories" :key="category.categoryId"
          :label="capitalize(category.name)" />
      </ul>
    </section>

    <section class="mt-4">
      <h5 class="font-semibold">Recipe: </h5>
      <ul>
        <li v-for="(ingredient, key) in selectedMeal.recipe.ingredients" :key="key">
          {{ ingredient.amount }} {{ ingredient.name }}
        </li>
      </ul>
      <p class="mt-4">{{ selectedMeal.recipe.description }}</p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { capitalize } from '@/helpers.vue'
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { selectedMeal } = storeToRefs(store);
</script>