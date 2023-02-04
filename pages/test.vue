<template>
  <h1 class="text-center text-accent-normal font-bold text-xl mb-10">Add meal</h1>

  <article class="fit-full">
    <section v-if="!addMeal" class="flex gap-2">
      <Input @input="setQuery" type="text" placeholder="Name.." />
      <ButtonSecondary @click="searchRecipe" label="Find meal" />
    </section>

    <section v-if="showCarousel" class="border border-white">
      <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
        class="flex flex-col justify-items-stretch mb-8">
        <Slide v-for="slide of recipeOptions" :key="slide.id" @click="selectRecipe(slide.id)" class="h-36 pb-2 px-1
          cursor-pointer">
          <article class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
            <img :src="slide.img" :alt="slide.title" @click="selectRecipe(slide.id)" />
            <h6
              class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
              {{ slide.title }}
            </h6>
          </article>
        </Slide>
      </Carousel>
    </section>

    <section v-if="addMeal" class="flex flex-col items-center gap-4">
      <div v-if="!editTitle" class="flex flex-col items-center gap-4">
        <h2 class="text-accent-normal text-lg font-bold"> {{ capitalize(addMeal.title) }}</h2>
        <ButtonSecondary @click="editTitle = true" label="Change name?" />
      </div>
      <div v-else class="flex flex-col items-center gap-4">
        <Input @input="setTitle" type="text" :placeholder="addMeal.title" class="min-w-[60%]" />
        <ButtonSecondary @click="changeTitle" label="Ok" />
      </div>
      <img :src="addMeal.picture" :alt="addMeal.title" class="w-40 h-auto rounded-lg overflow-hidden" />

      <section v-if="addMeal.categories.length > 0">
        <h5>Categories:</h5>
        <ul class="list-none w-full min-h-[40px] flex flex-wrap">
          <Pill v-if="addMeal.categories" v-for="(option, key) in addMeal.categories" :key="key"
            :label="capitalize(option.name)">
            <XMarkIcon @click="deleteCategory(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
          </Pill>
        </ul>
      </section>

      <Categories :deleted="deletedCategory" label="Select categories.." @update="updateCategories" />
      <GetRecipe :recipe="addMeal.recipe" />

      <AddRecipe />
      <Button label="Save meal" @click="saveRecipe" />
    </section>
  </article>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { userStore } from '~~/stores/userStore';
import { ICategory } from '~~/domain/types';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { capitalize } from '@/helpers.vue';
import { Ref } from '@vue/runtime-core';
const store = userStore();
const { newMeal, userCategories } = storeToRefs(store);
const appId = "2eb3cc88b15045b5b434805c117b656d";

interface IIngredient {
  name: string;
  amount: string;
}

interface IRecipe {
  servings: undefined | number,
  ingredients: IIngredient[],
  instructions: string
}

interface IMeal {
  title: string,
  id: number | undefined;
  categories: ICategory[];
  picture: string;
  recipe: IRecipe;
}

const query = ref('')
const recipeOptions = ref()
const showCarousel = ref(false)
const editTitle = ref(false)
const newTitle = ref('')
const addMeal: Ref<IMeal | undefined> = ref()
const deletedCategory = reactive({ name: '', categoryId: 0 });
const getRecipe: Ref<IRecipe | undefined> = ref();
const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

const setQuery = (e: Event) => {
  query.value = (e.target as HTMLInputElement).value;
}
const setTitle = (e: Event) => {
  newTitle.value = (e.target as HTMLInputElement).value;
}

const searchRecipe = () => {
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

const selectRecipe = (id: number) => {
  const SERVICE_URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`;
  const request_url = `${SERVICE_URL}&apiKey=${appId}`;

  axios.get(request_url)
    .then((response) => {
      let data = response.data;
      const allIngredients = [] as IIngredient[]
      console.log('second data', data);
      for (const ingredient of data.extendedIngredients) {
        allIngredients.push({ name: ingredient.name, amount: ingredient.amount })
      }
      const meal: IMeal = {
        title: data.title,
        id: data.id,
        picture: data.image,
        categories: [],
        recipe: {
          servings: data.servings,
          ingredients: allIngredients,
          instructions: data.instructions
        }
      }
      showCarousel.value = false
      //  selectedRecipe.value = recipe;
      addMeal.value = meal;
    })
    .catch((error) => {
      console.log(error);
    });
}

const updateCategories = (updatedSelections: ICategory) => {
  console.log('updatedSelectio', updatedSelections);
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

const changeTitle = () => {
  if (addMeal.value && addMeal.value.title) {
    addMeal.value.title = newTitle.value;
    editTitle.value = false;
  }
}

const saveRecipe = () => {
  console.log('saving recipe');
  navigateTo("/")
}

</script>