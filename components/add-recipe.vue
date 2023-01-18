<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }">
      <DisclosureButton v-if="!savedRecipe"
        class="flex grow w-full items-center bg-white bg-opacity-10 justify-between rounded-full px-4 py-2 text-left text-white">
        <span>Add recipe<span v-if="!open">? &nbsp;</span></span>
        <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-white" />
      </DisclosureButton>
      <DisclosurePanel
        :class="[savedRecipe ? 'bg-prime-normal' : 'bg-white bg-opacity-10', 'pt-4 pb-2 text-sm  mt-2 rounded-lg']">
        <section class="p-2">
          <h5 v-if="savedRecipe && ingredients.length > -1">Recipe:</h5>
          <h6>Ingredients</h6>
          <ul class="list-none w-full text-white min-h-[40px]">
            <li v-if="ingredients" v-for="(ingredient, key) in ingredients" :key="key">
              {{ ingredient.amount }} {{ ingredient.name }}
              <XMarkIcon v-if="!savedRecipe" class="inline ml-2 h-4 w-4 cursor-pointer"
                @click="deleteIngredient(ingredient)" />
            </li>
          </ul>
        </section>
        <section v-if="savedRecipe" class="flex flex-col justify-evenly gap-2 p-2">
          <h6>Description</h6>
          <p>{{ description }}</p>
        </section>

        <section class="flex justify-evenly gap-2 p-2">
          <input v-if="!savedRecipe" type="text" v-model="ingredient" placeholder="Ingredient.. "
            class="p-2 rounded-lg bg-white bg-opacity-10 grow min-w-60 h-8">
          <input v-if="!savedRecipe" type="text" v-model="amount" placeholder="Amount.."
            class="p-2 rounded-lg bg-white bg-opacity-10 w-[20%] min-w-[80px] flex-none h-8">
          <button v-if="!savedRecipe" class="bg-white text-prime-normal px-2 min-w-[60px] h-8 rounded-full"
            @click="addIngredient">Add</button>
        </section>

        <section class="flex flex-col justify-evenly gap-2 p-2">
          <textarea v-if="!savedRecipe" :rows="4" placeholder="Description.." v-model="description"
            class="rounded-lg p-2 bg-white text-white bg-opacity-10" />
          <button v-if="!savedRecipe" @click="saveRecipe"
            class="bg-white rounded-full w-fit px-2 h-8 text-prime-normal">Save recipe
          </button>
        </section>

      </DisclosurePanel>
    </Disclosure>
  </div>
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
const savedRecipe = ref(false)

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
  if (savedRecipe.value === true) {
    recipe.push({ ingredients: ingredients.value, description: description.value });
    emit('addRecipe', recipe);
    savedRecipe.value = true;
  }
};

</script>
