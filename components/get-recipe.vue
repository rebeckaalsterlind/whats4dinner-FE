<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex grow w-full items-center bg-white bg-opacity-10 justify-between rounded-lg px-4 py-2 mb-1 text-left text-white">
        <span>Add existing recipe?</span>
        <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-white" />
      </DisclosureButton>
      <DisclosurePanel>
        <section class="flex flex-col gap-2 p-4 bg-white bg-opacity-10 text-sm rounded-lg">
          <h4 v-if="recipe.servings">Servings: {{ recipe.servings }}</h4>
          <div>
            <h4>Ingredients:</h4>
            <ul>
              <li v-if="recipe.ingredients" v-for="ingredient in recipe.ingredients">
                {{ ingredient.amount }} | {{ ingredient.name }}
              </li>
            </ul>
          </div>

          <div>
            <h4>Instructions: </h4>
            <p v-html="recipe.instructions"></p>
          </div>
          <div class="flex justify-center">
            <ButtonSecondary label="Add recipe" @click="emit('addExistingRecipe', recipe);" />
          </div>
        </section>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/20/solid';

interface IIngredient {
  name: string;
  amount: string;
}

interface IGetRecipe {
  recipe: {
    servings: string | undefined;
    ingredients: IIngredient[];
    instructions: string
  }
}

const { recipe } = defineProps<IGetRecipe>()
const emit = defineEmits(['addExistingRecipe'])
</script>
