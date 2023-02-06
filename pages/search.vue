<template>
  <PageTitle label="Search meal" />
  <article class="p-2 mb-6 bg-white rounded-lg bg-opacity-10 text-prime-normal">
    <section class="">
      <aside class="flex justify-between flex-nowrap mb-2">
        <button @click="searchTitle = !searchTitle"
          :class="[searchTitle ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']">By
          name{{ searchTitle }}</button>
        <button @click="searchIngredients = !searchIngredients"
          :class="[searchIngredients ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']">By
          ingredients</button>
        <button @click="searchCategories = !searchCategories"
          :class="[searchCategories ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']"
          first-letter:>By
          category</button>
      </aside>
      <div>
        <Combobox>
          <ComboboxInput @change="query = $event.target.value.toLowerCase()" placeholder="Search.."
            class="px-2 py-1 rounded-lg" />
          <ComboboxOptions>
            <ComboboxOption v-for="recipe in filteredRecipes" :key="recipe.id" :value="recipe">
              <div
                class="cursor-pointer my-2 rounded-lg px-2 bg-white bg-opacity-10 text-white hover:text-accent-normal"
                @click="selectedMeal = recipe, navigateTo('/show-meal')">{{
  recipe.title
                }}</div>
            </ComboboxOption>
          </ComboboxOptions>
        </Combobox>
      </div>
    </section>
  </article>

</template>

<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import { checkLogin } from '~~/helpers.vue';
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { userMeals, userCategories, selectedMeal } = storeToRefs(store);

const query = ref('')
// const selectedRecipe = ref(userMeals[1])
const filteredRecipes = ref(userMeals)
const searchCategories = ref(true)
const searchIngredients = ref(true)
const searchTitle = ref(true)
const meals = ref(userMeals.value)
// const componentKey = ref(0);

const filterSearch = () => {
  console.log('in here', query.value.length);
  if (query.value.length > 0) {
    console.log('it is more than 0');
    const filtered = [];
    console.log('userMeals', userMeals.value);
    for (const meal of meals.value) {
      let isMatch = false;
      console.log('insede for const');
      // if (searchCategories.value) {
      //   console.log('recipe in serach', meals.categories);
      //   const foundByCategories = meals.categories.filter(i => i.name.includes(query.value));
      //   if (foundByCategories.length > 0) isMatch = true;
      // }

      if (searchIngredients.value) {
        console.log('in serachIngredients', searchIngredients.value);
        // for (const meal of meals) {
        //   console.log('meal.recipe', meal.recipe);
        // }
        const foundByIngredients = meal.recipe.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(query.value));
        console.log('foundbyingedient', foundByIngredients, meal.recipe.ingredients);
        if (foundByIngredients.length > 0) isMatch = true;
      }

      if (searchTitle.value) {
        console.log('meal.title', meal.title, query.value);
        if (meal.title.toLowerCase().includes(query.value)) {
          isMatch = true

          console.log('match', isMatch, 'meal.title', meal.title);
        }

      }

      //if one of them returns true, add to list. if none, remove from list
      if (isMatch) {
        filtered.push(meal)
        console.log('filtered', filtered, 'is match is true', isMatch);
      }
      filteredRecipes.value = filtered;
      console.log('filteredRevipes', filteredRecipes.value);
    }
  } else {
    filteredRecipes.value = [];
  }
}

watch(query, filterSearch);
onMounted(() => checkLogin());
</script>
