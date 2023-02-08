<template>
  <PageTitle label="Get a random meal" />
  <article class="flex grow flex-col justify-center items-center gap-4">
    <section v-if="randomMeal" @click="selectMeal" class="flex flex-col gap-4 mx-4 cursor-pointer">
      <h4 class="text-white text-center hover:text-accent-normal">{{ randomMeal.title }}</h4>
      <img :src="randomMeal.picture" :alt="randomMeal.title"
        class="rounded-lg h-auto w-full object-cover border-2 border-prime-normal hover:border-2 hover:border-accent-normal">
    </section>

    <ButtonSecondary label="Go" @click="findMeal">
      <ArrowPathIcon class="w-4 h-4 inline" />
    </ButtonSecondary>
  </article>


</template>

<script setup lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import 'vue3-carousel/dist/carousel.css';
import axios from 'axios';
const store = userStore();
const { selectedMeal } = storeToRefs(store);
const appId = "2eb3cc88b15045b5b434805c117b656d";
const randomMeal = ref();
const fromRandom = ref(false)

const findMeal = () => {
  fromRandom.value = true;
  const SERVICE_URL = 'https://api.spoonacular.com/recipes/random?number=1&tags=dinner';
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;

  axios.get(request_url)
    .then(({ data }) => {
      console.log('data in rendom meal', data);
      let recipes = data.recipes;
      const ingredients = [];

      for (const ingredient of recipes[0].extendedIngredients) {
        ingredients.push({ name: ingredient.name, amount: ingredient.amount })
      }
      randomMeal.value = {
        title: recipes[0].title,
        id: recipes[0].id,
        picture: recipes[0].image,
        recipe: {
          servings: recipes[0].servings,
          ingredients: ingredients,
          instructions: recipes[0].instructions
        }
      }
      console.log('randomMeal', randomMeal.value);
    })
    .catch((error) => {
      console.log(error);
    });
}

const selectMeal = () => {
  selectedMeal.value = randomMeal.value;
  navigateTo(`/show-meal/${randomMeal.value.id}`)
}

</script>