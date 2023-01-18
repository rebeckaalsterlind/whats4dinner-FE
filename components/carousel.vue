<template>
  <h4 class="ml-1 text-white font-semibold">{{ label }}</h4>
  <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
    class="flex flex-col justify-items-stretch mb-8">
    <Slide v-for="slide of category" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
      <article class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg ">
        <img src="@/assets/img/bolognese.jpg" :alt="slide.name" class="grow object-cover " />
        <h6
          class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
          {{ slide.name }}
        </h6>
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

  <!-- <NuxtLink :to="`/routeName/${recipe.id}`">
     picture 
  </NuxtLink> -->
