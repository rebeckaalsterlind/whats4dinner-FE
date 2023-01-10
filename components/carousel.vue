<template>
  <h4 class="border m-0">{{ label }}</h4>
  <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
    class="flex flex-col justify-items-stretch mx-[-8px] my-2">
    <Slide v-for="slide of category" :key="slide.id" class="h-40 py-2 px-1">
      <article class="w-full h-full flex flex-col items-start rounded overflow-hidden  bg-white drop-shadow-md ">
        <img src="@/assets/img/bolognese.jpg" :alt="slide.name" class="grow object-cover w-[154px]" />
        <h5 class="px-2 h-[15%]">
          {{ slide.name }}
        </h5>
      </article>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

interface IContent {
  name: string;
  id: number;
  img?: string;
}

interface ICarousel {
  category: IContent[],
  label: string
}

defineProps<ICarousel>();

</script>

<style>
.carousel__pagination-button::after {
  @apply bg-neutral-500
}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  @apply bg-neutral-900
}
</style>

  <!-- <NuxtLink :to="`/routeName/${recipe.id}`">
     picture 
  </NuxtLink> -->
