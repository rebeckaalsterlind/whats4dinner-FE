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

const user = {
  userName: 'Kalle',
  userEmail: 'kalle@gmail.com',
  password: 'jf948yf980w34fh',
  categories: [
    { categoryId: 1, name: 'vegetarian' },
    { categoryId: 2, name: 'vegan' },
    { categoryId: 3, name: 'healthy' },
    { categoryId: 4, name: 'spicy' },
    { categoryId: 5, name: 'soup' },
    { categoryId: 6, name: 'salad' },
    { categoryId: 7, name: 'comfort food' },
    { categoryId: 8, name: 'quick' },
    { categoryId: 9, name: 'special' },
    { categoryId: 10, name: 'slow cook' },
    { categoryId: 11, name: 'favourites' }
  ],
  recipes: [
    {
      title: 'pizza',
      id: 987533454647,
      keywords: ['pizza', 'pancake'],
      categories: [{ name: 'soup', categoryId: 5 }, { name: 'slow cook', categoryId: 10 }],
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
      keywords: ['pasta', 'pork mince'],
      categories: [{ name: 'favourites', categoryId: 11 }, { name: 'comfort food', categoryId: 7 }],
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
      keywords: ['fish', 'potato'],
      categories: [{ name: 'favourites', categoryId: 11 }, { name: 'healty', categoryId: 3 }],
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
      title: 'chicken',
      id: 27232425674695,
      keywords: ['chicken', 'potato'],
      categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }, { name: 'vegan', categoryId: 2 }],
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
      title: 'curry',
      id: 27232425674695,
      keywords: ['spicy', 'chili'],
      categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'quick', categoryId: 8 }, { name: 'special', categoryId: 9 }],
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
      title: 'Stirfry',
      id: 27287654676,
      keywords: ['noodles', 'potato'],
      categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }],
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
      title: 'broccoli soup',
      id: 2728548746,
      keywords: ['noodles', 'potato'],
      categories: [{ name: 'vegan', categoryId: 2 }, { name: 'healty', categoryId: 3 }, { name: 'soup', categoryId: 5 }, { name: 'vegetarian', categoryId: 1 }],
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
      title: 'pea soup',
      id: 3527554889846,
      keywords: ['peas', 'potato'],
      categories: [{ name: 'vegan', categoryId: 2 }, { name: 'healty', categoryId: 3 }, { name: 'soup', categoryId: 5 }, { name: 'vegetarian', categoryId: 1 }],
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
  ]
};

const query = ref('')
const selectedRecipe = ref(user.recipes[1])
const filteredRecipes = ref(user.recipes)
const searchCategories = ref(true)
const searchIngredients = ref(true)
const searchTitle = ref(true)
const componentKey = ref(0);

const filterSearch = () => {
  if (query.value !== '') {

    const filtered = [];

    for (const recipe of user.recipes) {
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

watch(query, filterSearch);
onMounted(() => checkLogin());
</script>
