<template>
  <PageTitle label="Meal suggestions" />
  <article class="flex flex-col grow justify-center">
    <p>Create list of selected number of meals from chosen categories</p>

    <h3 v-if="showName">{{ capitalize(listName) }}</h3>

    <section class="flex gap-4 flex-col justify-center">
      <section>
        <h5 v-if="tooFewMeals">There are no more meals to choose from in selected categories</h5>
        <div v-if="mealSuggestions.length > 0" v-for="(meal, index) in mealSuggestions" :key="index">
          <Pill :label="meal.title">
            <XMarkIcon class="w-4 h-4 inline hover:text-white cursor-pointer" @click="deleteMeal(meal, index)" />
          </Pill>
        </div>
      </section>

      <article class="p-4 bg-white rounded-lg bg-opacity-10 max-h-[60%]">
        <section>
          <ul :key="componentKey" v-if="savedCategories.length > 0 && !selectAll" class="overflow-scroll my-6">
            <li v-for="(category, index) in savedCategories" class="inline">
              {{ capitalize(category.name) }} {{ index !==
              savedCategories.length - 1 ? '| ' : '' }}
            </li>
          </ul>
          <ul v-if="selectAll" class="overflow-scroll my-6">
            <li v-for="(category, index) in userCategories" class="inline">{{ capitalize(category.name) }} {{ index !==
            userCategories.length - 1 ? '| ' : ''}} </li>
          </ul>
        </section>

        <section class="flex flex-col grow">
          <div v-if="!showName" class="flex gap-2">
            <Input class="grow bg-opacity-10 placeholder-white" v-model="listName" @input="addName"
              placeholder="Name of list.." />
            <ButtonSecondary label="Ok" @click="showName = true" />
          </div>

          <Listbox v-model="selectedNumber">
            <ListboxButton
              class="text-start content-fit cursor-pointer h-10 bg-white bg-opacity-10 mt-4 mb-1 p-2 rounded-lg text-white hover:text-accent-normal flex justify-between items-center">
              Number of meals {{ selectedNumber }}
              <ChevronDownIcon class="w-4 h-4 inline" />
            </ListboxButton>
            <ListboxOptions>
              <ListboxOption v-for="meal in numberOfMeals" :key="meal" :value="meal"
                class="cursor-pointer h-10 text-center bg-white bg-opacity-10 mb-1 p-2 rounded-lg text-white hover:text-accent-normal flex justify-between items-center">
                {{ meal }}
              </ListboxOption>
            </ListboxOptions>
          </Listbox>

          <Listbox v-model="selectedCategories" multiple>
            <ListboxButton
              class="text-start content-fit cursor-pointer h-10 bg-white bg-opacity-10 mt-4 mb-1 p-2 rounded-lg text-white hover:text-accent-normal">
              From categories
              <ChevronDownIcon class="w-4 h-4 inline" />
            </ListboxButton>
            <ListboxOptions>
              <li @click="toggleSelectAll" :class="{
                'bg-prime-normal text-white': selectAll,
                'bg-white bg-opacity-10 text-prime-normal': !selectAll,
              }"
                class="cursor-pointer h-10 text-center mb-1 p-2 rounded-lg  hover:text-accent-normal hover:bg-prime-normal active:text-white">
                Select all</li>
              <ListboxOption v-for="category in userCategories" :key="category.categoryId" :value="category"
                v-slot="{ active, selected }" @click="handleCategories(category)">
                <li className="category-list" :class="{
                  'bg-prime-normal text-white': selected,
                  'bg-white bg-opacity-10 text-prime-normal': !selected
                }"
                  class="cursor-pointer h-10 text-center mb-1 p-2 rounded-lg hover:text-accent-normal hover:bg-prime-normal active:text-white">
                  {{ capitalize(category.name) }}
                </li>
              </ListboxOption>
            </ListboxOptions>
          </Listbox>
        </section>
      </article>

      <section class="grow flex gap-4 items-end justify-between">
        <ButtonSecondary v-if="((selectedCategories.length > 0) || selectAll) && selectedNumber"
          :label="`Give me ${selectedNumber} ${selectedNumber > 1 ? 'meals' : 'meal'}`" @click="generateMeals" />
        <ButtonSecondary v-if="selectedCategories.length > 0 || selectAll" label="Reset" @click="reset" />
        <Button v-if="mealSuggestions.length > 0" label="Save" @click="saveMeals" />
      </section>
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
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { ICategory, IMeal } from '~~/domain/types';
import { capitalize, checkLogin, generateId } from '~~/helpers.vue'
import { userStore } from '~~/stores/userStore';
const store = userStore();
const { userMeals, userCategories, customLists } = storeToRefs(store);

const listName = ref('');
const showName = ref(false);
const numberOfMeals = [1, 2, 3, 4, 5, 6, 7];
const selectedCategories = ref([] as ICategory[])
const selectedNumber = ref();
const savedCategories = ref([] as ICategory[]);
const generatedMeals = reactive([] as IMeal[]);
const mealSuggestions = reactive([] as IMeal[]);
const tooFewMeals = ref(false);
const selectAll = ref(false)
const excludeMeals = ref([] as IMeal[] | any[])
const componentKey = ref(1)

//generate meal suggestions
const generateMeals = () => {
  tooFewMeals.value = false;
  if (selectAll) {
    selectedCategories.value = userCategories.value;
  }
  Object.assign(generatedMeals, [])

  for (const selectedCategory of selectedCategories.value) {
    for (const meal of userMeals.value) {
      if (generatedMeals.length < selectedNumber.value) {
        const matchingCategory = meal.categories.find((category: { categoryId: number; }) => category.categoryId === selectedCategory.categoryId)
        if (matchingCategory) {
          const findDouble = generatedMeals.find((savedMeal: { id: string | undefined; }) => savedMeal.id === meal.id)
          if (!findDouble) generatedMeals.push(meal)
        }
      }
    }
  }

  if (generatedMeals.length < selectedNumber.value) {
    tooFewMeals.value = true;
  } else {
    Object.assign(mealSuggestions, generatedMeals);
  }
}

//delete suggestion and generate new
const deleteMeal = (meal: IMeal, replaceIndex: number) => {
  excludeMeals.value.push(...mealSuggestions, meal);
  let newMeal;
  let chosenCategories;
  if (selectAll.value) chosenCategories = userCategories.value;
  else chosenCategories = savedCategories.value;

  for (const selectedCategory of chosenCategories) {
    for (const userMeal of userMeals.value) {
      if (userMeal.id !== meal.id) {
        let matchingCategory = userMeal.categories.find((category: { categoryId: number; }) => category.categoryId === selectedCategory.categoryId)
        if (matchingCategory) {
          const findDouble = excludeMeals.value.find(meal => meal.id === userMeal.id);
          console.log('mealsuggestons', mealSuggestions);
          if (!findDouble) {
            console.log('findDouble', findDouble);
            newMeal = userMeal;
          }
        }
      }
    }
  }

  if (newMeal) mealSuggestions.splice(replaceIndex, 1, newMeal)
  else {
    mealSuggestions.splice(replaceIndex, 1)
    tooFewMeals.value = true;
  }

}

//save selected categories
const handleCategories = (category: ICategory) => {
  selectAll.value = false;
  const pushOrSplice = savedCategories.value.findIndex(cat => cat.categoryId === category.categoryId)
  if (pushOrSplice !== -1) savedCategories.value.splice(pushOrSplice, 1)
  else savedCategories.value.push(category)
}

const toggleSelectAll = () => {
  selectAll.value = !selectAll.value;
  selectedCategories.value = [];
};

const reset = () => {
  selectedCategories.value = [];
  selectedNumber.value = null;
  savedCategories.value = [];
  selectAll.value = false;
  excludeMeals.value = [];
  tooFewMeals.value = false
  while (mealSuggestions.length > 0) {
    mealSuggestions.splice(0, 1)
  }
  while (generatedMeals.length > 0) {
    generatedMeals.splice(0, 1)
  }
}

const addName = (e: Event) => {
  listName.value = (e.target as HTMLInputElement).value;
}

const saveMeals = async () => {
  const newList = { name: listName.value, id: generateId(), list: mealSuggestions };
  console.log('list with id?');
  const userInLS = localStorage.getItem('user');

  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    try {
      const { data, error } = await useFetch('http://localhost:3030/meals/addCustomList', {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: { id: LSuser._id, customList: newList }
      });
      localStorage.setItem('user', JSON.stringify(data.value));
      checkLogin();
      navigateTo('/')
    } catch (error) {
      console.log('error', error);
    }
  } else {
    navigateTo('/my-account')
  }
}

</script>




