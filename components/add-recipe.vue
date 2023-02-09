<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }">
      <DisclosureButton v-if="!savedRecipe"
        class="flex grow w-full items-center bg-white bg-opacity-10 justify-between rounded-lg px-4 py-2 mb-1 text-left text-white">
        <span>Add my own recipe</span>
        <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-white" />
      </DisclosureButton>
      <DisclosurePanel>
        <section class="flex flex-col gap-2 p-4 bg-white bg-opacity-10 text-sm rounded-lg">
          <div>
            <h5 v-if="savedRecipe && ingredients.length > -1">Recipe:</h5>
            <ul class="list-none w-full text-white min-h-[40px]">
              <li v-if="ingredients" v-for="(ingredient, key) in ingredients" :key="key">
                {{ ingredient.amount }} {{ ingredient.name }}
                <XMarkIcon v-if="!savedRecipe" class="inline ml-2 h-4 w-4 cursor-pointer"
                  @click="deleteIngredient(ingredient)" />
              </li>
            </ul>
          </div>
          <section class="flex flex-col gap-2">
            <div>
              <input type="number" placeholder="Servings.." v-model="servings"
                class="p-2 rounded-lg bg-white bg-opacity-10 grow min-w-60 h-8" />
            </div>
            <div class="flex justify-evenly gap-2">
              <input v-if="!savedRecipe" type="text" v-model="ingredient" placeholder="Ingredient.. "
                class="p-2 rounded-lg bg-white bg-opacity-10 grow min-w-60 h-8">
              <input v-if="!savedRecipe" type="text" v-model="amount" placeholder="Amount.."
                class="p-2 rounded-lg bg-white bg-opacity-10 w-[20%] min-w-[80px] flex-none h-8">
              <button v-if="!savedRecipe" class="bg-white text-prime-normal px-2 min-w-[60px] h-8 rounded-full"
                @click="addIngredient">Add</button>
            </div>
          </section>
          <section class="flex flex-col justify-evenly gap-2">
            <textarea v-if="!savedRecipe" :rows="4" placeholder="instructions.." v-model="instructions"
              class="rounded-lg p-2 bg-white text-white bg-opacity-10" />
          </section>
          <section class="flex justify-center">
            <ButtonSecondary v-if="!savedRecipe" @click="saveRecipe" label="Add recipe" />
          </section>
        </section>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { Ref } from '@vue/runtime-core';
import { IIngredient, IRecipe } from '~~/domain/types';

const ingredient = ref();
const amount = ref();
const servings: Ref<string | undefined> = ref();
const ingredients = ref([] as IIngredient[]);
const instructions = ref();
const recipe = reactive([] as IRecipe[]);
const savedRecipe = ref(false);

const emit = defineEmits(['addOwnRecipe']);

const addIngredient = () => {
  ingredients.value.push({ name: ingredient.value, amount: amount.value })
  ingredient.value = '';
  amount.value = '';
};

const deleteIngredient = (ingredient: IIngredient) => {
  ingredients.value = ingredients.value.filter(item => item.name !== ingredient.name);
};

const saveRecipe = () => {
  savedRecipe.value = !savedRecipe.value;
  if (savedRecipe.value === true) {
    if (servings.value) (servings.value).toString;
    recipe.push({ servings: servings.value, ingredients: ingredients.value, instructions: instructions.value });
    emit('addOwnRecipe', ...recipe);
    savedRecipe.value = true;
  }
};

</script>
