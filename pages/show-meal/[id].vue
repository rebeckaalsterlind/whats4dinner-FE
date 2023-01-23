<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10" v-for="item in recipe" :key="item.id">
    <h2 class="font-bold text-lg  text-accent-normal">{{ helpers.capitalize(item.title) }}</h2>
    <section class="my-4" v-if="item.picture">
      <PhotoIcon class="w-40 h-40 text-white" />
    </section>
    <section class="my-4">
      <h5 class="font-semibold">Key ingredients: </h5>
      <ul class="flex">
        <Pill v-for="ingredient in item.ingredients" :key="ingredient.id"
          :label="helpers.capitalize(ingredient.name)" />
      </ul>
    </section>

    <section class="my-4">
      <h5 class="font-semibold">Categories:</h5>
      <ul class="flex">
        <Pill v-for="category in user.categories" :key="category.categoryId"
          :label="helpers.capitalize(category.name)" />
      </ul>
    </section>

    <section class="mt-4">
      <h5 class="font-semibold">Recipe: </h5>
      <ul>
        <li v-for="(ingredient, key) in item.recipe.ingredients" :key="key">
          {{ ingredient.amount }} {{ ingredient.name }}
        </li>
      </ul>
      <p class="mt-4">{{ item.recipe.description }}</p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { helpers } from '@/helpers.vue'
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { useCounterStore } from '~~/stores/counter';
const store = useCounterStore();
const { user } = store;
const route = useRoute();
const recipe = ref()
//find recipe from pinia with params
console.log('route.params.id', route.params.id);
const findRecipe = () => {
  recipe.value = user.recipes.find(recipe => recipe!.id.toString() === route.params.id)
}
findRecipe();
// const recipe = [{
//   title: 'pasta bolognese',
//   id: 9873654274693,
//   ingredients: [{ name: 'pasta', id: 3 }, { name: 'pork mince', id: 1 }],
//   categories: [{ name: 'favourites', id: 11 }, { name: 'comfort food', id: 7 }],
//   picture: true,
//   recipe: {
//     ingredients: [
//       { name: 'eggs', amount: '2' },
//       { name: 'butter', amount: '150g' },
//       { name: 'tomato sauce', amount: '1dl' },
//       { name: 'onions', amount: '2' },
//     ],
//     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
//   }
// }]

</script>