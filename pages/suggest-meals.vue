<template>
  <div class="flex grow flex-col gap-6 mb-28">
    <h1 class="text-center text-accent-normal font-bold text-xl">Generate meal suggestions</h1>

    <section class="min-h-[40px] my-4">
      <h5 v-if="tooFewMeals">There are no more meals in selected categories</h5>
      <div v-if="mealSuggestions.length > 0" v-for="(meal, index) in mealSuggestions" :key="index">
        <button :key="meal.id" class="bg-prime-normal px-2 my-1 rounded-full ">
          {{ meal.title }}
          <XMarkIcon class="text-white w-4 h-4 inline hover:text-accent-normal" @click="deleteMeal(meal, index)" />
        </button>
      </div>
    </section>


    <article class="p-4 bg-white rounded-lg bg-opacity-10 max-h-[60%]">
      <ul v-if="savedCategories.length > 0" class="overflow-scroll my-6">
        <li v-for="category in savedCategories" class="inline">{{ category.name }} | </li>
      </ul>

      <ul v-if="selectAll" class="overflow-scroll my-6">
        <li v-for="category in userCategories" class="inline">{{ category.name }} | </li>
      </ul>

      <section class="flex flex-col gap-6">
        <Listbox v-model="selectedNumber">
          <ListboxButton class="text-start content-fit">
            Meals {{ selectedNumber }}
            <ChevronDownIcon class="w-4 h-4 inline" />
          </ListboxButton>
          <ListboxOptions>
            <ListboxOption v-for="meal in numberOfMeals" :key="meal" :value="meal"
              class="cursor-pointer h-10 text-center bg-white bg-opacity-10 my-2 p-2 rounded-lg text-prime-normal hover:text-accent-normal">
              {{ meal }}
            </ListboxOption>
          </ListboxOptions>
        </Listbox>

        <Listbox v-model="selectedCategories" multiple>
          <ListboxButton class="text-start content-fit">Categories
            <ChevronDownIcon class="w-4 h-4 inline" />
          </ListboxButton>
          <ListboxOptions>
            <li @click="selectAll = !selectAll" :class="{
              'bg-prime-normal text-white': selectAll,
              'bg-white bg-opacity-10 text-prime-normal': !selectAll,
            }"
              class="cursor-pointer h-10 text-center  my-2 p-2 rounded-lg  hover:text-accent-normal active:text-white">
              Select all</li>
            <ListboxOption v-for="category in userCategories" :key="category.categoryId" :value="category"
              v-slot="{ active, selected }" @click="handleCategories(category)">

              <li :class="{
                'bg-prime-normal text-white': selected,
                'bg-white bg-opacity-10 text-prime-normal': !selected,
              }"
                class="cursor-pointer h-10 text-center  my-2 p-2 rounded-lg  hover:text-accent-normal active:text-white">
                {{ capitalize(category.name) }}
              </li>

            </ListboxOption>
          </ListboxOptions>
        </Listbox>

      </section>
    </article>


    <section class="grow flex gap-4 items-end justify-between">
      <Button v-if="((selectedCategories.length > 0) || selectAll) && selectedNumber"
        :label="`Give me ${selectedNumber} ${selectedNumber > 1 ? 'meals' : 'meal'}`" @click="generateMeals" />
      <Button v-if="selectedCategories.length > 0 || selectAll" label="Reset" @click="reset" />
      <Button v-if="mealSuggestions.length > 0" label="Save" @click="saveMeals" />
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { ICategory, IRecipes } from '~~/domain/types';
import { capitalize } from '~~/helpers.vue'
import { userStore } from '~~/stores/userStore';
const store = userStore();
const { userRecipes, userCategories, userList } = storeToRefs(store);

const numberOfMeals = [1, 2, 3, 4, 5, 6, 7];
const selectedCategories = ref([] as ICategory[])
const selectedNumber = ref();
const savedCategories = ref([] as ICategory[]);
const generatedMeals = reactive([] as IRecipes[]);
const mealSuggestions = reactive([] as IRecipes[]);
const tooFewMeals = ref(false);
const selectAll = ref(false)
//generate meal suggestions
const generateMeals = () => {
  tooFewMeals.value = false;
  if (selectAll) {
    selectedCategories.value = userCategories.value;
  }
  console.log('mealsuggestion', mealSuggestions);
  console.log('selected number', selectedNumber.value);
  Object.assign(generatedMeals, [])

  for (const selectedCategory of selectedCategories.value) {
    for (const recipe of userRecipes.value) {
      if (generatedMeals.length < selectedNumber.value) {
        const matchingCategory = recipe.categories.find((category: { categoryId: number; }) => category.categoryId === selectedCategory.categoryId)
        if (matchingCategory) {
          const findDouble = generatedMeals.find((savedRecipe: { id: number; }) => savedRecipe.id === recipe.id)
          if (!findDouble) generatedMeals.push(recipe)
        }
      }
    }
  }

  if (generatedMeals.length < selectedNumber.value) {
    tooFewMeals.value = true;
  }
  Object.assign(mealSuggestions, generatedMeals);

}

//delete suggestion and generate new
const deleteMeal = (meal: IRecipes, replaceIndex: number) => {

  let newRecipe;
  for (const selectedCategory of savedCategories.value) {
    for (const recipe of userRecipes.value) {
      if (recipe.id !== meal.id) {
        let matchingCategory = recipe.categories.find((category: { categoryId: number; }) => category.categoryId === selectedCategory.categoryId)
        if (matchingCategory) newRecipe = recipe;
      }
    }
  }

  if (newRecipe) mealSuggestions.splice(replaceIndex, 1, newRecipe)
  else tooFewMeals.value = true

}


//save selected categories
const handleCategories = (category: ICategory) => {
  selectAll.value = false;
  const pushOrSplice = savedCategories.value.findIndex(cat => cat.categoryId === category.categoryId)
  if (pushOrSplice !== -1) savedCategories.value.splice(pushOrSplice, 1)
  else savedCategories.value.push(category)
}

const reset = () => {
  selectedCategories.value = [];
  selectedNumber.value = null;
  savedCategories.value = [];
  selectAll.value = false;
  //Object.assign(generatedMeals, []);
  //Object.assign(mealSuggestions, initialState)
  console.log('generateMeals', generatedMeals);
  tooFewMeals.value = false
  while (mealSuggestions.length > 0) {
    mealSuggestions.splice(0, 1)
  }
  while (generatedMeals.length > 0) {
    generatedMeals.splice(0, 1)
  }
  //console.log('savedcate', selectedCategories.value, savedCategories.value, selectedNumber.value);
}

const saveMeals = async () => {
  userList.value = mealSuggestions;

  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    const saveSuggestions = await $fetch('http://localhost:3030/meals/addSuggestions', {
      method: 'POST',
      body: { id: LSuser.id, list: mealSuggestions }
    });

    localStorage.setItem('list', JSON.stringify(mealSuggestions));
    console.log('saveSuggestions', saveSuggestions);

    //saving.value = false;

    navigateTo('/')
  } else {
    navigateTo('/my-account')
  }
}

</script>




