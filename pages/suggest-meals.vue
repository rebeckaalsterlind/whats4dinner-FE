<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10">

    <h2 class="text-accent-normal text-center w-full">Generate meal suggestions</h2>
    <section v-if="tooFewMeals">There were only {{ showSuggestions.length }} meals in selected categories</section>
    <section v-if="showSuggestions.length > 0" v-for="meal in showSuggestions">
      <Pill :label="meal.title" />
      <XMarkIcon class="text-white w-4 h-4" @click="removeSuggested(meal)" />
    </section>
    <section class="flex gap-4 items-center my-4 justify-between">
      <div>{{ selectedNumber }} meals</div>
      <div>from {{ selectedCategories.map((category) => category.name).join(', ') }}</div>
      <Button label="Generate" @click="generateMeals" />
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
        <!-- <ListboxLabel> {{ selectedCategories.map((category) => category.name).join(', ') }} </ListboxLabel> -->
        <ListboxButton class="text-start content-fit">Select categories</ListboxButton>
        <ListboxOptions>
          <ListboxOption v-for="category in userCategories" :key="category.categoryId" :value="category"
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
  ListboxLabel,
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

// const { recipes } = defineProps<IUser>()
const selectedCategories = ref([] as ICategory[]);
const selectedNumber = ref(0);
const showSuggestions = reactive([] as IRec[]);
const tooFewMeals = ref(false);
const searchThroughRecipes = ref(userRecipes.value)
const generateMeals = () => {
  tooFewMeals.value = false;
  const generatedMeals = [] as IRec[];

  //random sort category list. 
  const shuffledCategories = [];
  const arrayToShuffle = [...selectedCategories.value];
  while (arrayToShuffle.length) {
    shuffledCategories.push(arrayToShuffle.splice(~~(Math.random() * arrayToShuffle.length), 1)[0]);
  }

  for (const selectedCategory of shuffledCategories) {
    for (const recipe of searchThroughRecipes.value) {
      if (generatedMeals.length < selectedNumber.value) {
        const matchingCategory = recipe.categories.find((category: { categoryId: number; }) => selectedCategory.categoryId === category.categoryId)
        if (matchingCategory) {
          const findDouble = generatedMeals.find((savedRecipe: { id: number; }) => savedRecipe.id === recipe.id)
          if (!findDouble) generatedMeals.push(recipe);
        }
      }
    }
  }

  if (generatedMeals.length < selectedNumber.value) {
    tooFewMeals.value = true;
  }
  Object.assign(showSuggestions, generatedMeals)
}


const removeSuggested = (meal: any) => {

  console.log('searchthgoughrecipes', searchThroughRecipes.value);

  //remove from list of recipies to generate from
  for (const i of showSuggestions) {
    const index = searchThroughRecipes.value.findIndex(recipes => recipes.id === i.id)
    searchThroughRecipes.value.splice(index, 1);
  }

  //remove from selected
  const deleted = showSuggestions.findIndex(recipe => recipe.id === meal.id)
  showSuggestions.splice(deleted, 1)

}

//add button for generate all new or just the remaining

</script>