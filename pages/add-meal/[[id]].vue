<template>
  <PageTitle label="Add meal" />
  <article class="flex grow flex-col justify-center">

    <div class="flex flex-col gap-4">
      <section v-if="!addMeal" class="flex flex-col items-center gap-4">
        <Input @input="setQuery" type="text" placeholder="Name.." class="min-w-[60%]" />
        <ButtonSecondary @click="searchMeal" label="Go" />
      </section>

      <section v-if="showCarousel">
        <Carousel :items-to-scroll="1" :wrap-around="true" :items-to-show="3" snap-align="start"
          class="flex flex-col justify-items-stretch mb-8">
          <Slide v-for="slide of recipeOptions" :key="slide.id" @click="selectMeal(slide.id)">
            <article class="cursor-pointer flex rounded-lg overflow-hidden drop-shadow-lg h-40 px-1">
              <img :src="slide.img" :alt="slide.title" class="object-cover w-full" />
              <div class="absolute p-1 overflow-hidden break-all bottom-0 w-full h-8 bg-prime-normal bg-opacity-80">
                <h6 class=" text-xs font-light text-white text-center">
                  {{ slide.title }}
                </h6>
              </div>
            </article>
          </Slide>
        </Carousel>
      </section>
    </div>

    <section v-if="addMeal" class="flex flex-col items-center gap-4">
      <div v-if="!editTitle" class="flex flex-col items-center">
        <h2 class="text-accent-normal text-lg font-bold"> {{ capitalize(addMeal.title) }}</h2>
        <ButtonSecondary @click="editTitle = true" label="Change name?" class="text-xs" />
      </div>
      <div v-else class="flex flex-col items-center gap-4">
        <Input v-model="setTitle" @input="setTitle" type="text" :placeholder="addMeal.title" class="min-w-[60%]" />
        <ButtonSecondary @click="changeTitle" label="Ok" />
      </div>
      <img :src="addMeal.picture" :alt="addMeal.title" class="w-40 h-auto rounded-lg overflow-hidden" />

      <section v-if="addMeal.categories.length > 0">
        <ul class="list-none w-full min-h-[40px] flex flex-wrap">
          <Pill v-if="addMeal.categories" v-for="(option, key) in addMeal.categories" :key="key"
            :label="capitalize(option.name)">
            <XMarkIcon @click="deleteCategory(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
          </Pill>
        </ul>
      </section>

      <Categories id="cat" :deleted="deletedCategory" label="Select categories.." @update="updateCategories" />
      <Disclosure v-if="recipeAdded" v-slot="{ open }">
        <DisclosureButton
          class="flex grow w-full items-center bg-white bg-opacity-10 justify-between rounded-lg px-4 py-2 mb-1 text-left text-white">
          <span>Recipe</span>
          <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-white" />
        </DisclosureButton>
        <DisclosurePanel>
          <section v-if="recipeAdded" class="flex flex-col gap-2 p-4 bg-white bg-opacity-10 text-sm rounded-lg">
            <h4>Servings: {{ addMeal.recipe.servings || '' }}</h4>
            <div>
              <h4>Ingredients: </h4>
              <ul>
                <li v-for="ingredient in addMeal.recipe.ingredients">
                  {{ ingredient.amount }} {{ ingredient.name }}
                </li>
              </ul>
            </div>
            <div>
              <h4>Instructions: </h4>
              <p>{{ addMeal.recipe.instructions }}</p>
            </div>
          </section>
        </DisclosurePanel>
      </Disclosure>

      <GetRecipe v-if="!recipeAdded" :recipe="addMeal.recipe" @add-existing-recipe="addRecipe" />
      <AddRecipe v-if="!recipeAdded" @addOwnRecipe="addRecipe" />
      <Button :disabled="addMeal.categories.length < 1" label="Save meal" @click="handleSave" />
    </section>
  </article>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { XMarkIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';
import { userStore } from '~~/stores/userStore';
import { ICategory, IIngredient, IMeal, IRecipe } from '~~/domain/types';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { capitalize, checkLogin } from '@/helpers.vue';
import { Ref } from '@vue/runtime-core';
const store = userStore();
const { selectedMeal } = storeToRefs(store);
const appId = "2eb3cc88b15045b5b434805c117b656d";
const route = useRoute();

const query = ref('')
const recipeOptions = ref()
const showCarousel = ref(false)
const editTitle = ref(false)
const newTitle = ref('')
const addMeal: Ref<IMeal | undefined> = ref()
const deletedCategory = reactive({ name: '', categoryId: 0 });
const recipeAdded = ref(false);

//search query
const setQuery = (e: Event) => {
  query.value = (e.target as HTMLInputElement).value;
}

//get meal suggestions
const searchMeal = () => {
  let SERVICE_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${query.value}&number=10`;
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;
  axios.get(request_url)
    .then((response) => {
      let data = response.data;
      console.log('first data', data.results);

      const arr = []
      for (const recipe of data.results) {
        arr.push({ title: recipe.title, img: recipe.image, id: recipe.id })
      }
      recipeOptions.value = arr;
      showCarousel.value = true;
      console.log('recipeOtions', recipeOptions.value);
    })
    .catch((error) => {
      console.log(error);

    });
}

//get meal
const selectMeal = (id: number) => {
  const SERVICE_URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`;
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;

  axios.get(request_url)
    .then((response) => {
      let data = response.data;
      const ingredients = [] as IIngredient[];
      for (const ingredient of data.extendedIngredients) {
        ingredients.push({ name: ingredient.name, amount: ingredient.amount })
      }
      const meal: IMeal = {
        title: data.title,
        id: (data.id).toString(),
        picture: data.image,
        categories: [],
        recipe: {
          servings: (data.servings).toString(),
          ingredients: ingredients,
          instructions: data.instructions
        }
      }
      showCarousel.value = false
      addMeal.value = meal;
    })
    .catch((error) => {
      console.log(error);
    });
}

//categories
const updateCategories = (updatedSelections: ICategory) => {
  if (addMeal.value && addMeal.value.categories) {
    addMeal.value.categories.push(updatedSelections);
  }
}

const deleteCategory = (category: ICategory) => {
  if (addMeal.value && addMeal.value.categories) {
    addMeal.value.categories = addMeal.value.categories.filter(item => item.categoryId !== category.categoryId);
    Object.assign(deletedCategory, category)
  }
}

//title
const setTitle = (e: Event) => {
  newTitle.value = (e.target as HTMLInputElement).value;
}

const changeTitle = () => {
  if (addMeal.value && addMeal.value.title) {
    addMeal.value.title = newTitle.value;
    editTitle.value = false;
  }
}

//reipe
const addRecipe = (recipe: IRecipe) => {
  if (addMeal.value && addMeal.value.recipe) addMeal.value.recipe = recipe;
  console.log('recipe', recipe);
  recipeAdded.value = true;
}

//save meal
const handleSave = async () => {
  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    try {
      const { data, error } = await useFetch('http://localhost:3030/meals/addMeal', {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: { id: LSuser._id, meal: addMeal.value }
      });
      store.$patch({
        selectedMeal: addMeal.value
      })
      localStorage.setItem('user', JSON.stringify(data.value));
      checkLogin();
      navigateTo('/show-meal')
    } catch (error) {
      console.log('error', error);
    }
  } else {
    navigateTo('/my-account')
  }
};

onMounted(() => {
  checkLogin();
  if (route.params.id) {
    selectMeal(Number(route.params.id))
    console.log('route.params.company', route.params.id);
  }
});
</script>