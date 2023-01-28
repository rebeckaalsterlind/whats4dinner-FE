<template>
  <article class="p-2 mb-6 bg-white rounded-lg bg-opacity-10 text-prime-normal">
    <h2 class="text-white">Search meal</h2>
    <section class="">
      <aside class="flex justify-between flex-nowrap mb-2">
        <button @click="searchTitle = !searchTitle"
          :class="[searchTitle ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']">By
          name</button>
        <button @click="searchCategories = !searchCategories"
          :class="[searchCategories ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']"
          first-letter:>By
          category</button>
        <button @click="searchIngredients = !searchIngredients"
          :class="[searchIngredients ? 'bg-accent-normal' : 'bg-white bg-opacity-10', 'm-1 px-2 py-1 rounded-full text-xs drop-shadow-lg hover:text-white']">By
          ingredient</button>
      </aside>
      <div>
        <Combobox v-model="selectedRecipe">
          <ComboboxInput @change="query = $event.target.value" placeholder="Search meal name.."
            class="px-2 py-1 rounded-lg" />
          <ComboboxOptions :key="componentKey">
            <ComboboxOption v-for="recipe in filteredRecipes" :key="recipe.id" :value="recipe">
              <div
                class="cursor-pointer my-2 rounded-lg px-2 bg-white bg-opacity-10 text-white hover:text-accent-normal"
                @click="selectedMeal = recipe, navigateTo('/show-meal')">{{
                  recipe.title || ''
                }}</div>
            </ComboboxOption>
          </ComboboxOptions>
        </Combobox>
      </div>
    </section>
  </article>

  <article class="p-4 bg-white rounded-lg bg-opacity-10 text-prime-normal">
    <Disclosure v-slot="{ open }">
      <DisclosureButton class="py-2">
        <h2 class="text-white inline">Generate meal suggestions</h2>
        <ChevronDownIcon :class="[open && 'rotate-180 transform', 'w-6 h-6 inline text-white']" />
      </DisclosureButton>
      <DisclosurePanel class="flex flex-col text-gray-500">
        <MealGenerator :recipes="recipes" />
      </DisclosurePanel>
    </Disclosure>
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
const { userRecipes, selectedMeal } = storeToRefs(store);

const query = ref('')
const selectedRecipe = ref(userRecipes[1])
const filteredRecipes = ref(userRecipes)
const searchCategories = ref(true)
const searchIngredients = ref(true)
const searchTitle = ref(true)
const componentKey = ref(0);

const filterSearch = () => {
  if (query.value !== '') {
    console.log('recipe in serach', userRecipes.value);

    const filtered = [];

    for (const recipe of userRecipes.value) {
      let isMatch = false;

      if (searchCategories.value) {
        console.log('recipe in serach', recipe);
        const foundByCategories = recipe.categories.filter(i => i.name.includes(query.value));
        if (foundByCategories.length > 0) isMatch = true;
      }

      if (searchIngredients.value) {
        const foundByIngredients = recipe.keywords.filter(i => i.includes(query.value));
        if (foundByIngredients.length > 0) isMatch = true;
      }

      if (searchTitle.value) {
        if (recipe.title.includes(query.value)) isMatch = true;
      }

      //if one of them returns true, add to list. if none, remove from list
      if (isMatch) filtered.push(recipe)
      filteredRecipes.value = filtered;
    }
  }
}

watch(query, filterSearch);
onMounted(() => checkLogin());
</script>
