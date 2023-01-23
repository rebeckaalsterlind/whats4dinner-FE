
<template>
  <section class="w-fit flex flex-col text-white">
    <div>{{ selectedNumber }}</div>
    <Listbox v-model="selectedNumber">
      <ListboxButton class="items-start content-fit">
        Select number of meals:
      </ListboxButton>
      <ListboxOptions>
        <ListboxOption class="border border-white items-start" v-for="meal in numberOfMeals" :key="meal" :value="meal">
          {{ meal }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

    <Listbox v-model="selectedCategory" multiple>
      <ListboxLabel> {{ selectedCategory.map((category) => category.name).join(', ') }} </ListboxLabel>
      <ListboxButton>Select categories</ListboxButton>
      <ListboxOptions class="border border-white">
        <ListboxOption v-for="category in categories" :key="category.categoryId" :value="category">
          {{ category.name }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <Button label="Generate" @click="generateMeals" />
  </section>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

const numberOfMeals = [1, 2, 3, 4, 5, 6, 7];

interface ICategory {
  name: string,
  categoryId: number
}

interface IUser {
  userName: string,
  userEmail: string,
  password: string,
  categories: [{ categoryId: number, name: string }],
  recipes: [
    {
      title: string,
      id: number,
      keywords: [],
      categories: [{ name: string, categoryId: number }]
      picture: boolean,
      recipe: [{ ingredients: [], description: string }]
    }
  ]
}


const { recipes } = defineProps<IUser>()
const selectedCategory = ref([] as ICategory[])
const selectedNumber = ref(0)

const categories = [
  { categoryId: 1, name: 'vegetarian' },
  { categoryId: 2, name: 'vegan' },
  { categoryId: 3, name: 'healthy' },
  { categoryId: 4, name: 'spicy' },
  { categoryId: 5, name: 'soup' },
  { categoryId: 6, name: 'salad' },
  { categoryId: 7, name: 'comfort food' },
  { categoryId: 8, name: 'quick' },
  { categoryId: 9, name: 'special' },
  { categoryId: 10, name: 'slow cook' },
  { categoryId: 11, name: 'favourites' }
]


const getMealInCategory = (index: number) => {

  for (const recipe of recipes) {
    console.log('recipe', recipe);
  }
  // selectedCategory[index].name = 'favourites';
  //find number of recipes that is category
  //get length of number
  //random number from length. => index of recipe in category
}

const generateMeals = () => {

  if (selectedNumber.value <= selectedCategory.value.length) {
    for (let i = 0; i < selectedNumber.value; i++) {
      //i is index in category search
      //push found to list
      getMealInCategory(i);

    }
  } else {
    let index = 0;
    for (let i = 0; i < selectedNumber.value; i++) {
      index++;
      if (index >= selectedCategory.value.length) index = 0
      getMealInCategory(index);
    }
  }
}

</script>