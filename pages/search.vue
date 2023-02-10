<template>
  <PageTitle label="Search through saved meals" />
  <article class="flex flex-col grow justify-center">
    <section class="p-4 flex flex-col justify-between gap-2 bg-white rounded-lg bg-opacity-10 text-prime-normal">
      <div class="flex justify-evenly">
        <button @click="searchTitle = !searchTitle"
          :class="[searchTitle ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']">By
          name</button>
        <button @click="searchIngredients = !searchIngredients"
          :class="[searchIngredients ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']">By
          ingredients</button>
      </div>
      <Combobox>
        <ComboboxInput @change="query = $event.target.value.toLowerCase()" placeholder="Search.."
          class="focus:outline-none px-2 py-1 rounded-lg grow bg-white bg-opacity-10 text-white" />
        <ComboboxOptions>
          <ComboboxOption v-for="meal in filteredMeals" :key="meal.id" :value="meal">
            <div
              class="cursor-pointer mb-1 rounded-lg px-2 py-1 bg-white bg-opacity-10 text-white hover:text-accent-normal hover:bg-prime-normal text-sm"
              @click="selectedMeal = meal, navigateTo('/show-meal')">
              {{ meal.title }}
            </div>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </section>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue';
import { checkLogin } from '~~/helpers.vue';
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { userMeals, selectedMeal } = storeToRefs(store);

const query = ref('');
const filteredMeals = ref(userMeals);
const searchIngredients = ref(true);
const searchTitle = ref(true);
const meals = ref(userMeals.value);

const filterSearch = () => {
  const filtered = [];
  for (const meal of meals.value) {
    let isMatch = false;

    if (searchIngredients.value) {
      const foundByIngredients = meal.recipe.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(query.value));
      if (foundByIngredients.length > 0) isMatch = true;
    }

    if (searchTitle.value) {
      if (meal.title.toLowerCase().includes(query.value)) isMatch = true
    }

    if (isMatch) {
      filtered.push(meal)
    }

    filteredMeals.value = filtered;
  }
};

watch(query, filterSearch);
onMounted(() => checkLogin());
</script>
