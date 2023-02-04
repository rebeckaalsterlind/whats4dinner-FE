<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex grow w-full items-center bg-white bg-opacity-10 justify-between rounded-full px-4 py-2 text-left text-white">
        <span>See recipe<span v-if="!open">? &nbsp;</span></span>
        <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-white" />
      </DisclosureButton>
      <DisclosurePanel>
        <section>
          <h5 v-if="recipe.servings">Servings: {{ recipe.servings }}</h5>
          <li v-if="recipe.ingredients" v-for="ingredient in recipe.ingredients">
            {{ ingredient.amount }} | {{ ingredient.name }}
          </li>
          <p>{{ recipe.instructions }}</p>
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
    servings: number | undefined;
    ingredients: IIngredient[];
    instructions: string
  }
}

const { recipe } = defineProps<IGetRecipe>()

</script>
