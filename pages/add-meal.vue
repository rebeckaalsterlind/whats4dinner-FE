<template>
  <article class="fit-content min-h-[250px] border-white mb-2 mx-10">
    <h2 class="mt-0 font-bold text-xl">Add new meal: {{ helpers.capitalize(addMeal.title) || '' }}</h2>
    <section class="my-4">
      <h5 v-if="addMeal.ingredients.length > 0">Key ingredients:</h5>
      <ul class="list-none w-full min-h-[40px] flex flex-wrap">
        <li v-if="addMeal.ingredients" v-for="(option, key) in addMeal.ingredients" :key="key"
          class="mr-2 my-1 px-2 flex items-center justify-center rounded-full min-w-fit bg-accent-normal text-prime-normal">
          {{
            helpers.capitalize(option)
          }}
          <XMarkIcon class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
        </li>
      </ul>
    </section>
    <section>
      <h5 v-if="addMeal.categories.length > 0">Categories:</h5>
      <ul class="list-none w-full min-h-[40px] flex flex-wrap">
        <li v-if="addMeal.categories" v-for="(option, key) in addMeal.categories" :key="key"
          class="mr-2 my-1 px-2 flex items-center justify-center rounded-full min-w-fit bg-accent-normal text-prime-normal">
          {{
            helpers.capitalize(option.name)
          }}
          <XMarkIcon class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" @click="deleteCategory(option)" />
        </li>
      </ul>
    </section>
    <section v-if="addMeal.picture">
      <PhotoIcon class="w-10 h-10 text-prime-hover cursor-pointer" />
    </section>
  </article>

  <article class="mx-10">
    <BaseComponent v-if="showName">
      <Input placeholder="Name.." @input="updateName" />
      <AddMealBtn :disabled="mealName.length === 0" label="Next.." @click="goToNext('ingredients')" />
    </BaseComponent>

    <BaseComponent v-if="showIngredients">
      <SearchBar label="Add key ingredients.." @update="updateIngredients" />
      <AddMealBtn :disabled="addMeal.ingredients.length === 0" label="Next.." @click="goToNext('categories')" />
    </BaseComponent>

    <BaseComponent v-if="showCategories">
      <Dropdown :key="componentKey" :categories="categoriesFromFetch" :deleted="deletedCategory"
        label="Select categories.." @update="updateCategories" />
      <AddMealBtn :disabled="addMeal.categories.length === 0" label="Next.." @click="goToNext('picture')" />
    </BaseComponent>

    <BaseComponent v-if="showPicture">
      <div class="mt-4 flex items-center" @click="addPhoto">
        <PhotoIcon class="w-6 h-6 cursor-pointer" />
        <PlusIcon class="w-4 h-4" />
      </div>
      <AddMealBtn label="Next.." @click="goToNext('recipe')" />
    </BaseComponent>

    <BaseComponent v-if="showRecipe">
      <AddRecipe @addRecipe="addRecipe" @click="toggleBtn" />
      <Button v-if="!showAll && showBtn" label="Skip?" @click="goToNext('done')" />
    </BaseComponent>



    <div v-if="showAll" class="w-full flex justify-center">
      <Button :label="saving ? 'Saving...' : 'Save meal'" @click="handleSave"
        class="bg-accent-normal text-prime-normal" />
    </div>

  </article>
</template>

<script setup lang="ts">
import { PhotoIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { helpers } from '@/helpers.vue';

const categories = [
  { id: 1, name: 'Vegetarian' },
  { id: 2, name: 'Vegan' },
  { id: 3, name: 'Healthy' },
  { id: 4, name: 'Spicy' },
  { id: 5, name: 'Soup' },
  { id: 6, name: 'Salad' },
  { id: 7, name: 'Comfort' },
  { id: 8, name: 'Quick' },
  { id: 9, name: 'Special' },
  { id: 10, name: 'Slow cook' }
];

const saving = ref(false);
const addMeal = reactive({
  title: '',
  ingredients: [],
  categories: [] as IOptions[],
  picture: false,
  recipe: []
})

const deletedCategory = reactive({ id: 0, name: '' });
const categoriesFromFetch = reactive(categories as IOptions[]);
const showName = ref(true);
const showPicture = ref(false);
const showIngredients = ref(false);
const showCategories = ref(false);
const showRecipe = ref(false);
const showAll = ref(false);
const showBtn = ref(true);

const mealName = ref('');
const componentKey = ref(0)
interface IOptions {
  id: number,
  name: string,
}

const toggleBtn = (evt: Event): void => {
  if ((evt.target as HTMLInputElement).id.includes('headlessui-disclosure-button')) {
    showBtn.value = !showBtn.value;
  };
};

const goToNext = (nextStep: string) => {
  switch (nextStep) {
    case 'ingredients':
      if (mealName.value !== '') {
        addMeal.title = mealName.value;
        showIngredients.value = true;
        showName.value = false;
      }
      break;
    case 'categories':
      if (addMeal.ingredients.length !== 0) {
        showIngredients.value = false;
        showCategories.value = true
      }
      break;
    case 'picture':
      if (addMeal.categories.length !== 0) {
        showCategories.value = false
        showPicture.value = true
      }
      break;
    case 'recipe':
      showPicture.value = false
      showRecipe.value = true
      break;
    case 'done':
      showRecipe.value = false
      showAll.value = true
      break;
  }
}


const updateCategories = (updatedSelections: IOptions) => {
  addMeal.categories.push(updatedSelections);
}

const deleteCategory = (category: IOptions) => {
  addMeal.categories = addMeal.categories.filter(item => item.id !== category.id);
  Object.assign(deletedCategory, category)
  componentKey.value += 1
}








const addPhoto = (): void => {
  console.log('add photo');
  addMeal.picture = true;
}

const updateName = (e: Event) => {
  mealName.value = (e.target as HTMLInputElement).value
}


const updateIngredients = (updatedSelections: any) => {
  addMeal.ingredients = updatedSelections;
  if (addMeal.ingredients.length > 0) {

  }
}



const addRecipe = (recipe: any) => {
  addMeal.recipe = recipe;
  showAll.value = true;
  console.log('recipe saved', addMeal.recipe);
}

const handleSave = () => {
  console.log('save', addMeal);

  saving.value = true;
  //await post
  console.log('object',);
  setTimeout(function () {
    saving.value = false;
    navigateTo('/show-meal')
  }, 1000);
}



</script>