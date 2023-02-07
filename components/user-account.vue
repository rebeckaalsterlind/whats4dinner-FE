<template>
  <PageTitle label="My account" />
  <article v-if="user" class="flex flex-col gap-8 mx-4 bg-white bg-opacity-10 rounded-lg p-4">
    <section class="flex gap-4 justify-center items-center">
      <UserCircleIcon class="h-16 w-16 text-white cursor-pointer" />
      <div>
        <h3>Username: {{ user.userName }}</h3>
        <h3>Password: *************</h3>
        <h3 class="cursor-pointer hover:text-accent-normal active:text-white" @click="logout">Sign out?</h3>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div>
        <h3>Food categories: </h3>
        <ul>
          <li v-for="category in userCategories" class="text-sm">{{ capitalize(category.name) }}</li>
        </ul>
      </div>

      <div>
        <h3>SavedMeals:</h3>
        <ul>
          <li v-for="meal in userMeals" @click="handleClick(meal)"
            class="hover:text-accent-normal cursor-pointer text-sm">{{
              meal.title
            }}</li>
        </ul>
      </div>

      <div>
        <h3>My lists:</h3>
        <ul>
          <li v-for="meal in customLists" class="text-sm">
            {{ meal.name }}</li>
        </ul>
      </div>
    </section>
  </article>
</template>


<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { checkLogin, capitalize, logout } from '~~/helpers.vue';
import { IMeal } from '~~/domain/types';
const store = userStore();
const { user, userCategories, userMeals, selectedMeal, customLists } = storeToRefs(store);

const handleClick = (meal: IMeal) => {
  selectedMeal.value = meal
  navigateTo("/show-meal")
}
onMounted(() => {
  checkLogin()
  userMeals.value.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 0 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 1));
});
</script>