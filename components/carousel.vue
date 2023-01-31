<template>
  <article v-if="userList.length > 0">
    <h4 class="ml-1 text-white font-semibold">My generated list</h4>
    <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
      class="flex flex-col justify-items-stretch mb-8">
      <Slide v-for="slide of userList" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
        <article @click="goToMeal(slide)" class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
          <img src="@/assets/img/pizza.jpg" :alt="slide.title" class="grow object-cover " />
          <h6
            class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
            {{ slide.title }}
          </h6>
        </article>
      </Slide>
    </Carousel>
  </article>
  <article v-if="filteredCategories.length > 0">
    <h4 class="ml-1 text-white font-semibold">{{ category.name }}</h4>
    <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
      class="flex flex-col justify-items-stretch mb-8">
      <Slide v-for="slide of filteredCategories" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
        <article @click="goToMeal(slide)" class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
          <img src="@/assets/img/pizza.jpg" :alt="slide.title" class="grow object-cover " />
          <h6
            class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
            {{ slide.title }}
          </h6>
        </article>
      </Slide>
    </Carousel>
  </article>

</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { reactive } from '@vue/runtime-core';
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { IRecipes } from '~~/domain/types';
const store = userStore();
const { userRecipes, selectedMeal, userList } = storeToRefs(store);

const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

interface ICarousel {
  category: { name: string, categoryId: number }
}
const { category } = defineProps<ICarousel>();
const filteredCategories = reactive([] as IRecipes[]);
const setMeal = ref();

const goToMeal = (meal: IRecipes) => {
  setMeal.value = meal;
  selectedMeal.value = setMeal.value;
  navigateTo("/show-meal");
}

const printRecipes = () => {
  const mealsInCategory: { title: string; id: number; keywords: string[]; categories: { name: string; categoryId: number; }[]; picture: string | undefined; recipe: { ingredients: { name: string; amount: string; }[]; description: string; }[]; }[] = [];

  for (const recipe of userRecipes.value) {
    for (const cat of recipe.categories) {
      if (cat.categoryId === category.categoryId) mealsInCategory.push(recipe)
    }
  }

  Object.assign(filteredCategories, mealsInCategory);
}

watch(category, printRecipes)

onMounted(() => {
  printRecipes();
});
</script>
