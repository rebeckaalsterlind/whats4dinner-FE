<template>
  <h4 class="ml-1 text-white font-semibold">{{ category.name }}</h4>
  <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
    class="flex flex-col justify-items-stretch mb-8">
    <Slide v-for="slide of filteredCategories" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer"
      @click="navigateTo(`/show-meal/${slide.id}`)">
      <article class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
        <img src="@/assets/img/pizza.jpg" :alt="slide.title" class="grow object-cover " />
        <h6
          class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
          {{ slide.title }}
        </h6>
      </article>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { reactive } from '@vue/runtime-core';

import { useCounterStore } from '~~/stores/counter';
const store = useCounterStore();
const { user } = store;

const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

interface ICarousel {
  category: { name: string, categoryId: number }
}

const { category } = defineProps<ICarousel>();
const filteredCategories = reactive([{ title: '', id: 0, picture: '' }]);

const filterCategories = () => {
  const mealsInCategory = [];

  for (const recipes of user.recipes) {
    const found = recipes?.categories.filter(recipe => recipe.categoryId === category.categoryId)
    if (found !== undefined && found.length > 0) {
      mealsInCategory.push({ title: recipes?.title, id: recipes?.id, picture: recipes?.picture ? recipes.picture : 'dummy pic' })
    }
  }

  Object.assign(filteredCategories, mealsInCategory)
}

filterCategories();


</script>
