<template>

  <article v-if="filteredMeals.length > 0">
    <h4 v-if="category" class="ml-1 text-white font-semibold">{{ capitalize(category.name) }}</h4>
    <h4 v-if="customList">{{ capitalize(customList.name) }}</h4>
    <Carousel :items-to-scroll="1" :wrap-around="false" :settings="settings"
      class="flex flex-col justify-items-stretch mb-8">
      <Slide v-for="slide of filteredMeals" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
        <article @click="goToMeal(slide)" class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
          <img :src="slide.picture" :alt="slide.title"
            class="rounded-lg h-auto w-full object-cover border-2 border-prime-normal hover:border-2 hover:border-accent-normal" />
          <h6
            class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
            {{ capitalize(slide.title) }}
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
import { IMeal } from '~~/domain/types';
import { capitalize } from '~~/helpers.vue';
const store = userStore();
const { userCategories, userMeals, selectedMeal } = storeToRefs(store);

const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

interface ICarousel {
  category?: {
    categoryId: number,
    name: string
  };
  customList?: {
    name: string;
    list: IMeal[];
  }
}

const { category, customList } = defineProps<ICarousel>();
const filteredMeals = reactive([] as IMeal[]);
const setMeal = ref();

const goToMeal = (meal: IMeal) => {
  setMeal.value = meal;
  selectedMeal.value = setMeal.value;
  navigateTo("/show-meal");
}

const printRecipes = () => {
  console.log('category', category);
  console.log('customList', customList);
  if (category) {
    const mealsInCategory = [] as IMeal[]
    for (const userMeal of userMeals.value) {
      for (const cat of userMeal.categories) {
        const findDouble = mealsInCategory.find(meal => meal.id === userMeal.id)
        if ((cat.categoryId === category.categoryId) && (!findDouble)) mealsInCategory.push(userMeal)
      }
    }
    Object.assign(filteredMeals, mealsInCategory);
  } if (customList) {
    console.log('customList in if', customList);
    Object.assign(filteredMeals, customList.list);

  }
}

onMounted(() => {
  printRecipes();
});
</script>
