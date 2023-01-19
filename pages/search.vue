<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10 text-prime-normal">
    <section>

      <Combobox v-model="selectedRecipe">
        <ComboboxInput @change="query = $event.target.value" placeholder="Search meal name.." class="p-2 rounded-lg" />
        <ComboboxOptions :key="componentKey">
          <ComboboxOption v-for="recipe in filteredRecipes" :key="recipe.id" :value="recipe">
            <span class="cursor-pointer hover:text-accent-normal" @click="navigateTo(`/show-meal/${recipe.id}`)">{{
              recipe.title || ''
            }}</span>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </section>
    <section>
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="py-2">
          Filter search
          <ChevronDownIcon :class="[open && 'rotate-180 transform', 'w-6 h-6 inline']" />
        </DisclosureButton>
        <DisclosurePanel class="text-gray-500">

          <button @click="searchCategories = !searchCategories">dont search through categories</button>
          <div>{{ searchCategories? 'true': 'false' }}</div>
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
const componentKey = ref(0);

const filterSearch = () => {
  if (query.value !== '') {

    const afterFilter = [];

    for (const recipe of recipes) {
      let isMatch = false;

      //find categories with query in category
      const foundByCategories = recipe.categories.filter(i => i.name.includes(query.value));
      if (foundByCategories.length > 0) isMatch = true;

      const foundByIngredients = recipe.ingredients.filter(i => i.name.includes(query.value));
      if (foundByIngredients.length > 0) isMatch = true;

      if (recipe.title.includes(query.value)) isMatch = true;

      //if one of them returns true, add to list. if none, remove from list
      if (isMatch) afterFilter.push(recipe)


      filteredRecipes.value = afterFilter;
    }

  }
}
watch(query, filterSearch)
</script>
