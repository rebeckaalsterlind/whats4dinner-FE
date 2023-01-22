<template>
  <h4 class="ml-1 text-white font-semibold">{{ label }}</h4>
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
import { reactive, ref } from '@vue/runtime-core';

const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

interface IContent {
  categoryId: number;
  name: string;
  img?: string;
}

interface ICarousel {
  category: IContent,
  label: string
}

const { category } = defineProps<ICarousel>();
const filteredCategories = reactive([{ title: '', id: 0, picture: 'pizza' }]);

interface IUser {
  userName: string,
  userEmail: string,
  password: string,
  categories: [{ categoryId: number, name: string }],
  recipes: [
    {
      title: string,
      id: number,
      keywords: [],
      categories: [{ name: string, categoryId: number }]
      picture: string,
      recipe: [{ ingredients: [], description: string }]
    }
  ]
}

const user = {
  userName: 'Kalle',
  userEmail: 'kalle@gmail.com',
  password: 'jf948yf980w34fh',
  categories: [
    { categoryId: 1, name: 'vegetarian' },
    { categoryId: 2, name: 'vegan' },
    { categoryId: 3, name: 'healthy' },
    { categoryId: 4, name: 'spicy' },
    { categoryId: 5, name: 'soup' },
    { categoryId: 6, name: 'salad' },
    { categoryId: 7, name: 'comfort food' },
    { categoryId: 8, name: 'quick' },
    { categoryId: 9, name: 'special' },
    { categoryId: 10, name: 'slow cook' },
    { categoryId: 11, name: 'favourites' }
  ],
  recipes: [
    {
      title: 'pizza',
      id: 987533454647,
      keywords: ['pizza', 'pancake'],
      categories: [{ name: 'soup', categoryId: 5 }, { name: 'slow cook', categoryId: 10 }],
      picture: 'bolognese',
      recipe: {
        ingredients: [
          { name: 'water', amount: '2' },
          { name: 'chilli', amount: '150g' },
          { name: 'spinach', amount: '1dl' },
          { name: 'salt', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'pasta bolognese',
      id: 9873654274693,
      keywords: ['pasta', 'pork mince'],
      categories: [{ name: 'favourites', categoryId: 11 }, { name: 'comfort food', categoryId: 7 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'fish & chips',
      id: 2765425674695,
      keywords: ['fish', 'potato'],
      categories: [{ name: 'favourites', categoryId: 11 }, { name: 'healty', categoryId: 3 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'chicken',
      id: 27232425674695,
      keywords: ['chicken', 'potato'],
      categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }, { name: 'vegan', categoryId: 2 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'curry',
      id: 27232425674695,
      keywords: ['spicy', 'chili'],
      categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'quick', categoryId: 8 }, { name: 'special', categoryId: 9 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'Stirfry',
      id: 27287654676,
      keywords: ['noodles', 'potato'],
      categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'broccoli soup',
      id: 2728548746,
      keywords: ['noodles', 'potato'],
      categories: [{ name: 'vegan', categoryId: 2 }, { name: 'healty', categoryId: 3 }, { name: 'soup', categoryId: 5 }, { name: 'vegetarian', categoryId: 1 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    },
    {
      title: 'pea soup',
      id: 3527554889846,
      keywords: ['peas', 'potato'],
      categories: [{ name: 'vegan', categoryId: 2 }, { name: 'healty', categoryId: 3 }, { name: 'soup', categoryId: 5 }, { name: 'vegetarian', categoryId: 1 }],
      picture: 'pizza',
      recipe: {
        ingredients: [
          { name: 'eggs', amount: '2' },
          { name: 'butter', amount: '150g' },
          { name: 'tomato sauce', amount: '1dl' },
          { name: 'onions', amount: '2' },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
      }
    }
  ]
};
const setUser = ref(user.recipes)




const filterCategories = () => {
  const mealsInCategory = [];
  for (const recipe of setUser.value) {
    const found = recipe.categories.filter(arr => arr.categoryId === category.categoryId)
    if (found.length > 0) mealsInCategory.push({ title: recipe.title, id: recipe.id, picture: recipe.picture })
  };
  Object.assign(filteredCategories, mealsInCategory);
}

filterCategories();



</script>

  <!-- <NuxtLink :to="`/routeName/${recipe.id}`">
     picture 
  </NuxtLink> -->
