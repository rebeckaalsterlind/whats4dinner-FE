<template>
  <PageTitle label="Meal suggestions" />
  <article class="grow flex flex-col justify-center items-center gap-4">

    <ButtonSecondary v-if="!randomMeal && !savedMeals" label="From saved meals"
      @click="savedMeals = true, randomMeal = false" />
    <ButtonSecondary v-if="!randomMeal && !savedMeals" label="New random meal"
      @click="randomMeal = true, savedMeals = false" />

    <RandomMeal v-if="randomMeal" />
    <MealGenerator v-if="savedMeals" />
  </article>
</template>

<script setup lang="ts">
const randomMeal = ref(false);
const savedMeals = ref(false);

</script>




