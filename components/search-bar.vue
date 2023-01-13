<template>
  <ul v-if="selectedIngredients" v-for="(option, key) in selectedIngredients" :key="key">
    <li>{{ option }}
      <XMarkIcon @click="deleteIngredient(option)" class="inline h-4 w-4" />
    </li>
  </ul>
  <input id="inputField" type="search" :placeholder="label" @input="handleInput" @click="clearSearchHelp">
  <ul v-if="result && showOptions" v-for="(option, key) in result" :key="key">
    <li @click="handleClick" :value="option">{{ option }}</li>
  </ul>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { Ref } from '@vue/runtime-core';

const emit = defineEmits(['update'])
const { label } = defineProps<{ label: string }>()

const showOptions = ref(false)
const result = reactive([]);
const selectedIngredients: Ref<string[]> = ref([]);

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

const handleClick = (e: Event) => {
  let ingredient: string = (e.target as HTMLInputElement).innerText
  selectedIngredients.value.push(ingredient);
  emit('update', selectedIngredients.value);
  clearSearchHelp();
}

const deleteIngredient = (deleted: string) => {
  selectedIngredients.value = selectedIngredients.value.filter(ingredient => ingredient !== deleted);
  emit('update', selectedIngredients.value);
}

// GET https://api.spoonacular.com/recipes/1003464/ingredientWidget.json
</script>