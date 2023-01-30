<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10">

    <h2 class="text-accent-normal text-center w-full">Generate meal suggestions</h2>
    <div v-for="cat in savedCategories">{{ cat.name }}</div>
    <section v-if="tooFewMeals">There were only {{ showSuggestions.length }} meals in selected categories</section>
    <section v-if="showSuggestions.length > 0" v-for="meal in showSuggestions">
      <Pill :label="meal.title" />
      <XMarkIcon class="text-white w-4 h-4" @click="deleteMeal(meal)" />
    </section>
    <button @click="generateMeals(false, savedCategories)">Generate {{ selectedNumber -
    showSuggestions.length }} new meals</button>
    <section class="flex gap-4 items-center my-4 justify-between">
      <div>{{ selectedNumber }} meals</div>
      <!-- <div>from {{ selectedCategories.map((category: { name: string; }) => category.name).join(', ') }}</div> -->
      <Button label="Generate" @click="generateMeals(true, savedCategories)" />
      <Button label="Reset categories" @click="resetCategories" />

    </section>
    <section class=" flex flex-col justify-between items-start text-whitew-full">

      <Listbox v-model="selectedNumber">
        <ListboxButton class="text-start content-fit">
          Select number of meals:
        </ListboxButton>
        <ListboxOptions>
          <ListboxOption v-for="meal in numberOfMeals" :key="meal" :value="meal"
            class="cursor-pointer h-6 bg-white bg-opacity-10 my-1 px-2 rounded-lg text-prime-normal hover:text-accent-normal">
            {{ meal }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>

      <Listbox v-model="selectedCategories" multiple>
        <ListboxButton class="text-start content-fit">Select categories</ListboxButton>
        <ListboxOptions>
          <ListboxOption v-for="category in userCategories" :key="category.categoryId" :value="category"
            @click="handleCategories(category)"
            class="cursor-pointer h-6 bg-white bg-opacity-10 my-1 px-2 rounded-lg text-prime-normal hover:text-accent-normal">
            {{ category.name }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>

    </section>
  </article>
</template>


<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import { IRecipes } from '~~/domain/types';
import { userStore } from '~~/stores/userStore';
const store = userStore();
const { userRecipes, userCategories } = storeToRefs(store);

const numberOfMeals = [1, 2, 3, 4, 5, 6, 7];

interface ICategory {
  name: string,
  categoryId: number
}

interface IRec {
  title: string;
  id: number;
  keywords: string[];
  categories: {
    name: string;
    categoryId: number;
  }[];
  picture: string;
  recipe: {
    ingredients: {
      name: string;
      amount: string;
    }[];
    description: string;
  };
}[]

const selectedCategories = ref([] as ICategory[]);
const savedCategories = ref([] as ICategory[]);
const selectedNumber = ref();
const showSuggestions = reactive([] as IRec[]);
const tooFewMeals = ref(false);
const remainingRecipes = ref(userRecipes.value)
const componentKey = ref(0)
const generateMeals = (reset: boolean, categories: ICategory[]) => {

  console.log('categoreis', categories.length);
  if (categories.length <= 0) {
    console.log('choose categories');
  }
  else if (!selectedNumber.value) {
    console.log('selected number', selectedNumber.value);
  } else {



    tooFewMeals.value = false;
    const generatedMeals = [] as IRec[];

    let recipes;
    let num;
    if (reset) {
      recipes = userRecipes.value;
      num = selectedNumber.value
    } else {
      recipes = remainingRecipes.value
      num = selectedNumber.value - showSuggestions.length;
    }

    for (const selectedCategory of shuffle(categories)) {
      for (const recipe of recipes) {
        if (generatedMeals.length < num) {
          const matchingCategory = recipe.categories.find((category: { categoryId: number; }) => category.categoryId === selectedCategory.categoryId)
          if (matchingCategory) {
            const findDouble = generatedMeals.find((savedRecipe: { id: number; }) => savedRecipe.id === recipe.id)
            if (!findDouble) generatedMeals.push(recipe)
          }
        }
      }
    }

    if (generatedMeals.length < num) {
      tooFewMeals.value = true;
    }

    let newRound = generatedMeals;
    if (!reset) newRound = [...showSuggestions, ...generatedMeals]

    Object.assign(showSuggestions, newRound);
  }

}

//fix any
const deleteMeal = (meal: any) => {

  //remove from list of recipies to generate from
  for (const suggestion of showSuggestions) {
    const index = remainingRecipes.value.findIndex(recipes => recipes.id === suggestion.id)
    remainingRecipes.value.splice(index, 1);
  }

  //remove from selected
  const deleted = showSuggestions.findIndex(recipe => recipe.id === meal.id)
  showSuggestions.splice(deleted, 1)

}

const shuffle = (categories: ICategory[]) => {
  const shuffledCategories = [];
  //need this?
  const arrayToShuffle = [...categories];
  while (arrayToShuffle.length) {
    shuffledCategories.push(arrayToShuffle.splice(~~(Math.random() * arrayToShuffle.length), 1)[0]);
  }
  return shuffledCategories
}

//save selected categories
const handleCategories = (category: ICategory) => {
  const pushOrSplice = savedCategories.value.findIndex(cat => cat.categoryId === category.categoryId)
  if (pushOrSplice !== -1) savedCategories.value.splice(pushOrSplice, 1)
  else savedCategories.value.push(category)
}

const resetCategories = () => {
  savedCategories.value = [];
  console.log('saved caat', savedCategories.value);
  componentKey.value += 1;
}
</script>




