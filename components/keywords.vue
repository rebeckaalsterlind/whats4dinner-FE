<template>
  <section class="w-full">
    <Input id="inputField" :placeholder="label" @input="handleInput" @click="clearSearchHelp" />
    <div v-if="result && showOptions" class="bg-white flex flex-col gap-1 px-1 bg-opacity-10 rounded-lg h-fit w-full">
      <ul v-for="(option, key) in result" :key="key" class="h-10">
        <li @click="handleClick(option)" :value="option"
          class="h-full w-full rounded-lg p-2 bg-white bg-opacity-10 hover:bg-prime-normal my-1 hover:text-accent-normal active:text-white">
          {{ option }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Ref } from '@vue/runtime-core';

const emit = defineEmits(['update'])
const { label } = defineProps<{ label: string }>()

const showOptions = ref(false)
const result = reactive([]);
const selectedIngredients = ref([] as string[]);

const getSuggestions = async (url: string) => {
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch(error => console.warn(error));
}

const clearSearchHelp = () => {
  const searchInput = document.getElementById('inputField');
  (searchInput! as HTMLInputElement).value = '';
  showOptions.value = false;
}

const handleInput = async (e: Event): Promise<void> => {
  showOptions.value = true;
  const searchIngredient = (e.target as HTMLInputElement).value;
  const url = `https://api.edamam.com/auto-complete?app_id=739442be&app_key=b461bdd737f87ed7fb994cef55b6423d&q=%22${searchIngredient}%22&limit=5`;

  getSuggestions(url).then(response => Object.assign(result, response));

};

const handleClick = (option: string) => {
  emit('update', option);
  clearSearchHelp();
}

// GET https://api.spoonacular.com/recipes/1003464/ingredientWidget.json
</script>