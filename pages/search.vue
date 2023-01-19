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
                @click="navigateTo(`/show-meal/${recipe.id}`)">{{
                  recipe.title || ''
                }}</div>
            </ComboboxOption>
          </ComboboxOptions>
        </Combobox>
      </div>


    </section>

  </article>

  <article class="p-4 bg-white rounded-lg bg-opacity-10 text-prime-normal">

    <section>
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="py-2">
          <h2 class="text-white inline">Generate suggestions</h2>
          <ChevronDownIcon :class="[open && 'rotate-180 transform', 'w-6 h-6 inline text-white']" />
        </DisclosureButton>
        <DisclosurePanel class="text-gray-500">
          <label for="no-of-meals">Number of meal</label>
          <select id="no-of-meals">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          from categories
        </DisclosurePanel>
      </Disclosure>
    </section>

  </article>

</template>

<script setup>
import { ref, computed } from 'vue';
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
import { DiagnosticCategory } from 'typescript';



const recipes = [
  {
    title: 'pizza',
    id: 987533454647,
    ingredients: [{ name: 'pizza', id: 3 }, { name: 'pancake', id: 1 }],
    categories: [{ name: 'soup', id: 11 }, { name: 'slow cook', id: 7 }],
    picture: false,
    recipe: {
      ingredients: [
        { name: 'water', amount: '2' },
        { name: 'chilli', amount: '150g' },
        { name: 'spinach', amount: '1dl' },
        { name: 'salt', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'pasta bolognese',
    id: 9873654274693,
    ingredients: [{ name: 'pasta', id: 3 }, { name: 'pork mince', id: 1 }],
    categories: [{ name: 'favourites', id: 11 }, { name: 'comfort food', id: 7 }],
    picture: false,
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'fish & chips',
    id: 2765425674695,
    ingredients: [{ name: 'fish', id: 3 }, { name: 'potato', id: 1 }],
    categories: [{ name: 'fav', id: 11 }, { name: 'healty', id: 7 }],
    picture: false,
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  }
];

const query = ref('')
const selectedRecipe = ref(recipes[1])
const filteredRecipes = ref(recipes)
const searchCategories = ref(true)
const searchIngredients = ref(true)
const searchTitle = ref(true)
const componentKey = ref(0);

const filterSearch = () => {
  if (query.value !== '') {

    const filtered = [];

    for (const recipe of recipes) {
      let isMatch = false;

      if (searchCategories.value) {
        console.log('recipe in serach', recipe);
        const foundByCategories = recipe.categories.filter(i => i.name.includes(query.value));
        if (foundByCategories.length > 0) isMatch = true;
      }

      if (searchIngredients.value) {
        const foundByIngredients = recipe.ingredients.filter(i => i.name.includes(query.value));
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


//generate meals:  until length is 3 (number of meals) for each 2 recipe
const meals = 7;
const categories = 2;
const result = meals % categories;
console.log('result', result);
// for (let i = 0; i < 3; i++) {
//   //find 
// }
//get length of Category
// find random index from length
//divide meals/categories = number from each


watch(query, filterSearch)
</script>
