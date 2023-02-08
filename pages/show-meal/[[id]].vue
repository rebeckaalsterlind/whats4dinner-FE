<template>
  <PageTitle v-if="selectedMeal?.title" :label="capitalize(selectedMeal!.title)" />
  <article v-if="selectedMeal" class="p-4 bg-white rounded-lg bg-opacity-10">

    <section class="my-4" v-if="selectedMeal.picture">
      <img :src="selectedMeal.picture" :alt="selectedMeal.title" class="rounded-lg object-cover w-full h-48">
    </section>

    <section v-if="selectedMeal.categories" class="my-4">
      <h5>Categories:</h5>
      <ul class="flex">
        <Pill v-for="category in selectedMeal.categories" :key="category.categoryId"
          :label="capitalize(category.name)" />
      </ul>
    </section>

    <section class="flex flex-col gap-2 mb-4">
      <h3 class="font-bold text-center">Recipe</h3>
      <h4 v-if="selectedMeal.recipe.servings">Servings: {{ selectedMeal.recipe.servings }}</h4>
      <div>
        <h4>Ingredients:</h4>
        <ul>
          <li v-for="(ingredient, key) in selectedMeal.recipe.ingredients" :key="key">
            {{ ingredient.amount }} {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div>
        <h4>Instructions:</h4>
        <p v-html="selectedMeal.recipe.instructions"></p>
      </div>
    </section>
    <NuxtLink v-if="route.params.id" :to="`/add-meal/${route.params.id}`" class="flex justify-center">
      <ButtonSecondary label="Save meal" />
    </NuxtLink>
    <div class="flex justify-center">
      <ButtonSecondary v-if="!route.params.id" label="Delete meal" @click="deleteMeal" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { capitalize, checkLogin } from '@/helpers.vue'
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { selectedMeal } = storeToRefs(store);
const route = useRoute();

const deleteMeal = async () => {

  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    try {
      const { data } = await useFetch('http://localhost:3030/meals/deleteMeal', {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: { id: LSuser._id, meal: selectedMeal.value }
      });
      localStorage.setItem('user', JSON.stringify(data.value));

      checkLogin();
      navigateTo('/')
    } catch (error) {
      console.log('error', error);
    }
  } else {
    navigateTo('/my-account')
  }
};

onMounted(() => {
  checkLogin()
  if (!selectedMeal.value) navigateTo("/");
});
</script>