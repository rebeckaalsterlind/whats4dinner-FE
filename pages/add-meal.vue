<template>

  <h2 class="mx-auto">Add new meal:</h2>

  <Input placeholder="Name.." @input="updateName" />
  <SearchBar class="drop-shadow-sm" label="Add key ingredients.." @update="updateIngredients" />

  <Dropdown :categories="categories" label="Select categories.." @update="updateCategories" />
  <div class="mt-4 flex items-center" @click="addPhoto">
    <PhotoIcon class="w-6 h-6 cursor-pointer" />
    <PlusIcon class="w-4 h-4" />
  </div>

  <Disclosure class="mt-10" @addRecipe="addRecipe" />
  <Button :label="saving ? 'Saving...' : 'Save'" @click="handleSave" />
</template>

<script setup lang="ts">
import { PhotoIcon, PlusIcon } from '@heroicons/vue/24/outline';

const saving = ref(false);
const addMeal = reactive({
  title: '',
  ingredients: [],
  categories: [],
  recipe: []
})


const addPhoto = (): void => {
  console.log('add photo');
}

const updateName = (e: Event) => {
  const inputValue: string = (e.target as HTMLInputElement).value
  addMeal.title = inputValue;
}


const updateIngredients = (updatedSelections: any) => {
  addMeal.ingredients = updatedSelections
}

const updateCategories = (updatedSelections: any) => {
  addMeal.categories = updatedSelections
}

const addRecipe = (recipe: any) => {
  addMeal.recipe = recipe;
}

const handleSave = () => {
  console.log('save', addMeal);

  saving.value = true;
  //await post
  console.log('object',);
  setTimeout(function () {
    saving.value = false;
    navigateTo('/show-meal')
  }, 1000);
}

const categories = [
  { id: 1, name: 'Vegetarian' },
  { id: 2, name: 'Vegan' },
  { id: 3, name: 'Healthy' },
  { id: 4, name: 'Spicy' },
  { id: 5, name: 'Soup' },
  { id: 6, name: 'Salad' },
  { id: 7, name: 'Comfort' },
  { id: 8, name: 'Quick' },
  { id: 9, name: 'Special' },
  { id: 10, name: 'Slow cook' }
];


</script>