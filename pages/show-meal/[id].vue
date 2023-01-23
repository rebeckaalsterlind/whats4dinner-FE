<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10">
    <h2 class="font-bold text-lg  text-accent-normal">{{ helpers.capitalize(recipe.title) }}</h2>
    <section class="my-4" v-if="recipe.picture">
      <PhotoIcon class="w-40 h-40 text-white" />
    </section>
    <section class="my-4">
      <h5 class="font-semibold">Key ingredients: </h5>
      <ul class="flex">
        <Pill v-for="(ingredient, key) in recipe.keywords" :key="key" :label="helpers.capitalize(ingredient.name)" />
      </ul>
    </section>

    <section class="my-4">
      <h5 class="font-semibold">Categories:</h5>
      <ul class="flex">
        <Pill v-for="category in recipe.categories" :key="category.categoryId"
          :label="helpers.capitalize(category.name)" />
      </ul>
    </section>

    <section class="mt-4">
      <h5 class="font-semibold">Recipe: </h5>
      <ul>
        <li v-for="(ingredient, key) in recipe.recipe.ingredients" :key="key">
          {{ ingredient.amount }} {{ ingredient.name }}
        </li>
      </ul>
      <p class="mt-4">{{ recipe.recipe.description }}</p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { helpers } from '@/helpers.vue'
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { useCounterStore } from '~~/stores/counter';
const store = useCounterStore();
const { user } = store;
const route = useRoute();
const recipe = ref()

recipe.value = user.recipes.find(recipe => recipe.id.toString() === route.params.id)


</script>