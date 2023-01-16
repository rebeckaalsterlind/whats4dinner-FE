<template>
  <!-- <ul class="list-none w-full min-h-[40px] flex flex-wrap">
      <h5 v-if="selectedIngredients.length > 0">Selected ingredients:</h5>
      <li v-if="selectedIngredients" v-for="(option, key) in selectedIngredients" :key="key"
        class="mr-2 my-1 px-2 flex items-center rounded-full min-w-fit bg-slate-500">{{ option }}
        <XMarkIcon @click="deleteIngredient(option)" class="inline ml-2 h-4 w-4 cursor-pointer" />
      </li>
    </ul> -->
  <Input id="inputField" :placeholder="label" @input="handleInput" @click="clearSearchHelp" />
  <div v-if="result && showOptions" class="bg-white bg-opacity-10 py-1 mt-1 rounded-lg h-fit w-full">
    <ul v-for="(option, key) in result" :key="key" class="h-10 m-1 flex justify-center items-center ">
      <li @click="handleClick" :value="option"
        class="h-full w-full rounded-lg p-2 bg-prime-normal bg-opacity-10 hover:bg-prime-normal my-2 hover:text-accent-normal active:text-white">
        {{
  option
        }}</li>
    </ul>
  </div>

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