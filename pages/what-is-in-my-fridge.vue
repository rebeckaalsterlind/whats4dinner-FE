<template>
  <PageTitle label="What is in my fridge?" />
  <article class="flex flex-col justify-center grow">
    <section v-if="showCarousel">
      <Carousel :items-to-scroll="1" :wrap-around="false" :settings="settings" class="flex flex-col mb-8">
        <Slide v-for="slide of recipeOptions" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
          <article @click="selectFridgeMeal(slide.id)"
            class="w-full h-full flex border-2 border-prime-normal hover:border-2 hover:border-accent-normal active:border-white rounded-lg overflow-hidden drop-shadow-lg">
            <img :src="slide.img" :alt="slide.title" class="rounded-lg h-auto w-full object-cover " />
            <div class="absolute flex items-center p-1  bottom-0 w-full  min-h-[18%] bg-prime-normal bg-opacity-[95%]">
              <h6 class="text-xs break-words font-light text-white text-start"> {{ capitalize(slide.title) }}</h6>
            </div>
          </article>
        </Slide>
      </Carousel>
    </section>
    <BaseComponent class="flex flex-col gap-4 items-center">
      <div class="flex w-full">
        <Pill v-for="ingredient in fridgeIngredients" :label="ingredient" />
      </div>
      <div class="flex w-full gap-2">
        <input id="ingredientInput" @input="addIngredient" placeholder="Ingredient.." v-model="ingredient"
          class="focus:outline-none p-2 rounded-lg placeholder-white bg-white bg-opacity-10 text-white fit-content grow h-10" />
        <ButtonSecondary label="Add" @click="pushIngredientToList" />
      </div>
      <Button label="Search" @click="searchFridgeMeal" />
    </BaseComponent>
  </article>
</template>

<script setup lang="ts">import axios from 'axios';
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { IIngredient, IMeal } from '~~/domain/types';
import { capitalize } from '~~/helpers.js';
const store = userStore();
const { selectedMeal } = storeToRefs(store);
const appId = "2eb3cc88b15045b5b434805c117b656d";
const fridgeIngredients = ref([] as string[]);
const ingredient = ref('');
const showCarousel = ref(false);
const recipeOptions = ref();

const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

const addIngredient = (e: Event) => {
  ingredient.value = (e.target as HTMLInputElement).value
};

const pushIngredientToList = () => {
  fridgeIngredients.value.push(ingredient.value);
  ingredient.value = '';
};

const searchFridgeMeal = () => {
  const query = fridgeIngredients.value.join(',+')
  const SERVICE_URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10`;
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;

  axios.get(request_url)
    .then(({ data }) => {
      const suggestions = []
      for (const recipe of data) {
        console.log('recipe', recipe);
        suggestions.push({ title: recipe.title, img: recipe.image, id: recipe.id })
      }
      recipeOptions.value = suggestions;
      showCarousel.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectFridgeMeal = (mealId: string) => {
  const SERVICE_URL = `https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=false`;
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;

  axios.get(request_url)
    .then((response) => {
      let data = response.data;
      const ingredients = [] as IIngredient[];
      for (const ingredient of data.extendedIngredients) {
        ingredients.push({ name: ingredient.name, amount: ingredient.amount })
      }
      const meal: IMeal = {
        title: data.title,
        id: (data.id).toString(),
        picture: data.image,
        categories: [],
        recipe: {
          servings: (data.servings).toString(),
          ingredients: ingredients,
          instructions: data.instructions
        }
      }
      showCarousel.value = false
      selectedMeal.value = meal
      navigateTo(`/show-meal/${meal.id}`)
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>