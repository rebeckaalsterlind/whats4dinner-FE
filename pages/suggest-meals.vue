<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10">

    <h2 class="text-accent-normal text-center w-full">Generate meal suggestions</h2>

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
const showSuggestions = ref(false);
const getMealInCategory = (index: number) => {

  for (const recipe of userRecipes.value) {
    // console.log('recipe', recipe);
  }
  // selectedCategories[index].name = 'favourites';
  //find number of recipes that is category
  //get length of number
  //random number from length. => index of recipe in category
}

const generateMeals = () => {


  const generatedMeals = [] as IRec[];

  //random sort category list. 
  const shuffledCategories = [];
  const arrayToShuffle = [...selectedCategories.value];
  while (arrayToShuffle.length) {
    shuffledCategories.push(arrayToShuffle.splice(~~(Math.random() * arrayToShuffle.length), 1)[0]);
  }

  for (const selectedCategory of shuffledCategories) {
    for (const recipe of userRecipes.value) {
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
    console.log('not enough recipes in categories');
    //show suggestions => set meal state form generatedMeals. 
  } else {
    showSuggestions.value = true;
    console.log('all done');
  }

}


//push categories to array = > [favourites, quick, veggie]
// loop thtough category array with number of meals. for each number of meal => get a recipe from category

//if recipe selected, pop from recipes list. and pop one number from that category? 
// if recipe excist in more than one category, check first. 
</script>