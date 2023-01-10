<template>
  <Input :placeholder="label" @input="handleInput" />
  <!-- <input type="text" :value="''" :placeholder="label" @input="handleInput"> -->
  <ul v-if="result" v-for="option in result" :key="option" class="cursor-pointer border">
    <li @click="handleClick" :value="option" :id="option">{{ option }}</li>
  </ul>
  <p v-if="selectedOption">{{ selectedOption }}</p>
</template>

<script setup lang="ts">
import { Ref } from '@vue/runtime-core';

const result: Ref<string[]> = ref([]);
const selectedOption = ref();

const { label } = defineProps<{ label: string }>()

const handleInput = async (e: Event): Promise<void> => {
  const searchIngredient = (e.target as HTMLInputElement).value;
  const url = `https://api.edamam.com/auto-complete?app_id=739442be&app_key=b461bdd737f87ed7fb994cef55b6423d&q=%22${searchIngredient}%22&limit=5`;
  const { data } = await useFetch(url);

  const suggestions: string[] = [];
  for (const ingredient of [data.value]) {
    console.log('ingredient', ingredient);
    // for (let i = 0; i < 10; i++) {
    //   suggestions.push(ingredient[i]);
    // }
  }
  result.value = suggestions;
};

const handleClick = (e: Event) => {
  selectedOption.value = (e.target as HTMLInputElement).id;
}


// https://nuxt.com/docs/getting-started/data-fetching
// const page = ref(1);
// const { data: users, pending, refresh, error } = await useFetch(() => `users?page=${page.value}&take=6`, { baseURL: config.API_BASE_URL }
// );
// function previous() {
//   page.value--;
//   refresh();
// }
// function next() {
//   page.value++;
//   refresh();
// }



// GET https://api.spoonacular.com/recipes/1003464/ingredientWidget.json
</script>