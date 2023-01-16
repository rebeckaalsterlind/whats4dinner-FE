<template>
  <BaseComponent>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between rounded px-4 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <span>Add recipe<span v-if="!open">?</span></span>
        <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-slate-500" />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">

        <section>
          <h5 v-if="!savedRecipe && ingredients.length > -1">Ingredients</h5>
          <ul class="list-none w-full min-h-[40px]">
            <li v-if="ingredients" v-for="(ingredient, key) in ingredients" :key="key">
              {{ ingredient.name }} {{ ingredient.amount }}
              <XMarkIcon class="inline ml-2 h-4 w-4 cursor-pointer" @click="deleteIngredient(ingredient)" />
            </li>
          </ul>
        </section>
        <input v-if="savedRecipe" type="text" v-model="ingredient" placeholder="Ingredient.. ">
        <input v-if="savedRecipe" type="text" v-model="amount" placeholder="Amount..">

        <button v-if="savedRecipe" class="border" @click="addIngredient">Add</button>
        <h5>Description</h5>
        <textarea v-if="savedRecipe" v-model="description" class="border" />
        <p v-if="!savedRecipe">{{ description }}</p>
        <button @click="saveRecipe">{{ savedRecipe? 'Save recipe': 'Edit recipe' }}</button>
      </DisclosurePanel>
    </Disclosure>
  </BaseComponent>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits(['addRecipe'])

interface IIngredients {
  name: string,
  amount: string
}

interface IRecipe {
  ingredients: IIngredients[],
  description: string
}

const ingredient = ref();
const amount = ref();
const ingredients = ref([] as IIngredients[]);
const description = ref();
const recipe = reactive([] as IRecipe[]);
const savedRecipe = ref(true)

const addIngredient = () => {
  ingredients.value.push({ name: ingredient.value, amount: amount.value })
  ingredient.value = '';
  amount.value = '';
};

const deleteIngredient = (ingredient: IIngredients) => {
  ingredients.value = ingredients.value.filter(item => item.name !== ingredient.name);
};

const saveRecipe = () => {
  savedRecipe.value = !savedRecipe.value;
  if (savedRecipe.value === false) {
    recipe.push({ ingredients: ingredients.value, description: description.value });
    emit('addRecipe', recipe);
    savedRecipe.value = false;
  }
};

</script>
