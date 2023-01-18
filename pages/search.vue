<template>
  <article class="p-4 bg-white rounded-lg bg-opacity-10 text-prime-normal">
    <section>

      <Combobox v-model="selectedRecipe">
        <ComboboxInput @change="query = $event.target.value" placeholder="Search meal name.." class="p-2 rounded-lg" />
        <ComboboxOptions>
          <ComboboxOption v-for="recipe in filteredRecipe" :key="recipe.id" :value="recipe">
            <span class="cursor-pointer hover:text-accent-normal" @click="navigateTo(`/show-meal/${recipe.id}`)">{{
              recipe.title
            }}</span>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </section>
    <section>
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="py-2">
          Filter search
          <ChevronDownIcon :class="[open && 'rotate-180 transform', 'w-6 h-6 inline']" />
        </DisclosureButton>
        <DisclosurePanel class="text-gray-500">
          filter through categories etc
        </DisclosurePanel>
      </Disclosure>
    </section>

  </article>

</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

const recipes = [
  {
    title: 'pasta bolognese',
    id: 9873654274693,
    ingredients: [{ name: 'pasta', id: 3 }, { name: 'pork mince', id: 1 }],
    categories: [{ name: 'favourites', id: 11 }, { name: 'comfort food', id: 7 }],
    picture: false,
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'fish & chips',
    id: 98732765425674693,
    ingredients: [{ name: 'fish', id: 3 }, { name: 'potato', id: 1 }],
    categories: [{ name: 'favourites', id: 11 }, { name: 'comfort food', id: 7 }],
    picture: false,
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  }
];


const selectedRecipe = ref(recipes[1])
const query = ref('')

const filteredRecipe = computed(() =>
  query.value === ''
    ? recipes
    : recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(query.value.toLowerCase())
    })
)
</script>

// <!--

<template>
  // <article class="p-4 bg-white rounded-lg bg-opacity-10">
    // <input type="text" placeholder="Search meal..">

    // <section>
      // Result
      // </section>
    // </article>
  // </template>

<script>
// const recipe = [{
//   title: 'pasta bolognese',
//   id: 9873654274693,
//   ingredients: [{ name: 'pasta', id: 3 }, { name: 'pork mince', id: 1 }],
//   categories: [{ name: 'favourites', id: 11 }, { name: 'comfort food', id: 7 }],
//   picture: false,
//   recipe: {
//     ingredients: [
//       { name: 'eggs', amount: '2' },
//       { name: 'butter', amount: '150g' },
//       { name: 'tomato sauce', amount: '1dl' },
//       { name: 'onions', amount: '2' },
//     ],
//     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
//   }
// },
// {
//   title: 'fish & chips',
//   id: 98732765425674693,
//   ingredients: [{ name: 'fish', id: 3 }, { name: 'potato', id: 1 }],
//   categories: [{ name: 'favourites', id: 11 }, { name: 'comfort food', id: 7 }],
//   picture: false,
//   recipe: {
//     ingredients: [
//       { name: 'eggs', amount: '2' },
//       { name: 'butter', amount: '150g' },
//       { name: 'tomato sauce', amount: '1dl' },
//       { name: 'onions', amount: '2' },
//     ],
//     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
//   }
// }]




// </script> -->