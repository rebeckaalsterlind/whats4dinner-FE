<template>
  <PageTitle label="Add meal" />
  <article v-if="!loading" class="flex grow flex-col justify-center">
    <section class="flex flex-col gap-4 grow">
      <div v-if="showCarousel">
        <Carousel :items-to-scroll="1" :wrap-around="true" :items-to-show="3" snap-align="start"
          class="flex flex-col justify-items-stretch mb-8">
          <Slide v-for="slide of recipeOptions" :key="slide.id" @click="selectMeal(slide.id)">
            <article
              class="cursor-pointer flex rounded-lg overflow-hidden border-2 border-prime-normal hover:border-accent-normal active:border-white drop-shadow-lg h-40  mx-1">
              <img :src="slide.img" :alt="slide.title" class="object-cover w-full" />
              <div class="absolute p-1 bottom-0 w-full min-h-8 bg-prime-normal bg-opacity-90">
                <h6 class="text-xs break-words font-light text-white text-start">
                  {{ slide.title }}
                </h6>
              </div>
            </article>
          </Slide>
        </Carousel>
        <p class="text-white text-center cursor-pointer hover:text-accent-normal" @click="selectMeal(0)">Skip
          suggestion?</p>
      </div>
      <section v-if="!addMeal" class="flex flex-col items-center gap-4 bg-white bg-opacity-10 rounded-lg p-4">
        <Input @input="setQuery" type="text" placeholder="Name.." class="min-w-[60%]" />
        <ButtonSecondary @click="searchMeal" label="Go" />
      </section>
    </section>
    <section v-if="addMeal" class="flex flex-col items-center gap-4">
      <div v-if="!editTitle" class="flex flex-col items-center gap-1">
        <h2 class="text-accent-normal text-lg font-bold"> {{ capitalize(addMeal.title) }}</h2>
        <ButtonSecondary @click="editTitle = true" label="Change name?" class="text-xs" />
      </div>
      <div v-else class="flex flex-col items-center gap-4">
        <Input v-model="newTitle" @input="setTitle" type="text" :placeholder="addMeal.title" class="min-w-[60%]" />
        <ButtonSecondary @click="changeTitle" label="Ok" />
      </div>
      <div class="overflow-hidden rounded-lg border border-white">
        <img :src="addMeal.picture" :alt="addMeal.title" class="w-full object-cover h-auto" />
      </div>
      <section v-if="addMeal.categories.length > 0">
        <ul class="list-none w-full min-h-[40px] flex flex-wrap">
          <Pill v-if="addMeal.categories" v-for="(option, key) in addMeal.categories" :key="key"
            :label="capitalize(option.name)">
            <XMarkIcon @click="deleteCategory(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
          </Pill>
        </ul>
      </section>
      <section class="w-full flex flex-col gap-4">
        <Categories id="cat" :deleted="deletedCategory" label="Select categories.." @update="updateCategories" />
        <Disclosure v-if="recipeAdded" v-slot="{ open }">
          <DisclosureButton
            class="flex grow w-full items-center bg-white bg-opacity-10 justify-between rounded-lg px-4 py-2 mb-1 text-left text-white">
            <span>Recipe</span>
            <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-white" />
          </DisclosureButton>
          <DisclosurePanel>
            <section v-if="recipeAdded"
              class="flex flex-col gap-2 p-4 w-full grow bg-white bg-opacity-10 text-sm rounded-lg">
              <h4>Servings: {{ addMeal.recipe.servings || '' }}</h4>
              <div>
                <h4>Ingredients:</h4>
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
      </section>
      <GetRecipe v-if="!recipeAdded && !skip" :recipe="addMeal.recipe" @add-existing-recipe="addRecipe" />
      <AddRecipe v-if="!recipeAdded" @addOwnRecipe="addRecipe" />
      <Button :disabled="addMeal.categories.length < 1" label="Save meal" @click="handleSave" />
    </section>
  </article>
  <div v-if="loading" class="w-full h-full grow flex justify-center items-center text-accent-normal">
    <ArrowPathIcon class="w-10 h-10" />
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { XMarkIcon, ChevronUpIcon, ArrowPathIcon } from '@heroicons/vue/20/solid';
import { userStore } from '~~/stores/userStore';
import { ICategory, IIngredient, IMeal, IRecipe } from '~~/domain/types';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { capitalize, checkLogin, generateId } from '@/helpers.vue';
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
const skip = ref(false);
const loading = ref(false)
//search query
const setQuery = (e: Event) => {
  query.value = (e.target as HTMLInputElement).value;
}

//get meal suggestions
const searchMeal = () => {
  let SERVICE_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${query.value}&number=20`;
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;
  axios.get(request_url)
    .then((response) => {
      let data = response.data;
      const arr = []
      for (const recipe of data.results) {
        arr.push({ title: recipe.title, img: recipe.image, id: recipe.id })
      }
      recipeOptions.value = arr;
      showCarousel.value = true;
    })
    .catch((error) => {
      console.log(error);
    });;
}

//get meal
const selectMeal = async (id: number) => {
  if (id === 0) {
    const id = generateId()
    const meal: IMeal = {
      title: query.value,
      id: id.toString(),
      picture: '/img-placeholder.jpg',
      categories: [],
      recipe: {
        servings: undefined,
        ingredients: [{ amount: '', name: '' }],
        instructions: ''
      }
    }
    skip.value = true;
    addMeal.value = meal;
  } else {
    const SERVICE_URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`;
    const request_url = `${SERVICE_URL}&apiKey=${appId}`;

    loading.value = true;
    await axios.get(request_url)
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
        addMeal.value = meal;
      })
      .catch((error) => {
        console.log(error);
      });
    loading.value = false
  }
  showCarousel.value = false;
}

//categories
const updateCategories = (updatedSelections: ICategory) => {
  if (addMeal.value && addMeal.value.categories) {
    addMeal.value.categories.push(updatedSelections);
  }
};
const deleteCategory = (category: ICategory) => {
  if (addMeal.value && addMeal.value.categories) {
    addMeal.value.categories = addMeal.value.categories.filter(item => item.categoryId !== category.categoryId);
    Object.assign(deletedCategory, category)
  }
};

//title
const setTitle = (e: Event) => {
  newTitle.value = (e.target as HTMLInputElement).value;
};
const changeTitle = () => {
  if (addMeal.value && addMeal.value.title) {
    addMeal.value.title = newTitle.value;
    editTitle.value = false;
  }
};

//reipe
const addRecipe = (recipe: IRecipe) => {
  if (addMeal.value && addMeal.value.recipe) {
    addMeal.value.recipe = recipe;
    recipeAdded.value = true;
  }
};

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
  if (route.params.id) selectMeal(Number(route.params.id))
});
</script>