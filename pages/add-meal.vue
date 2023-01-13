<template>
  <h2 class="mx-auto">Add new meal:</h2>
  <BaseComponent>
    <Input placeholder="Meal.." />
    <SearchBar class="drop-shadow-sm" label="Add key ingredients.." @update="updateIngredients"
      v-model="selectedIngredients" />
    <div class="flex items-center" @click="addPhoto">
      <PhotoIcon class="w-6 h-6 cursor-pointer" />
      <PlusIcon class="w-4 h-4" />
    </div>
  </BaseComponent>
  <Dropdown :categories="categories" label="Add categories.." @update="updateCategories" v-model="selectedCategories" />
  <Disclosure class="mt-10" label="Add recipe?">
    <DisclosureContent label="Recipe goes here!" />
  </Disclosure>
  <Button :label="saving ? 'Saving...' : 'Save'" @click="handleSave" />
</template>

<script setup lang="ts">
import { PhotoIcon, PlusIcon } from '@heroicons/vue/24/outline';
//import categories from '~~/assets/data/categories.vue';

interface ISelectedCategories {
  id: number,
  name: string,
}

const selectedCategories = ref([] as ISelectedCategories[]);
const selectedIngredients = ref([]);

const saving = ref(false);
const addPhoto = (): void => {
  console.log('add photo');
}

const updateIngredients = (updatedSelections: any) => {
  selectedIngredients.value = updatedSelections;
}

const updateCategories = (updatedSelections: any) => {
  selectedCategories.value = updatedSelections;
}

const handleSave = () => {
  saving.value = true;
  //await post
  setTimeout(function () {
    saving.value = false;
    navigateTo('/')
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