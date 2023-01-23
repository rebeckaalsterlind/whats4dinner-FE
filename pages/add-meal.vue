<template>
  <article class="fit-content min-h-[250px]">
    <div class="w-full flex justify-center">
      <h2 class="mt-0 items-center font-bold mx-auto fit-content inline-block text-xl">{{
        helpers.capitalize(addMeal.title) || ''
      }}
      </h2>
    </div>

    <section class="my-4">
      <h5 v-if="addMeal.keywords.length > 0">Key ingredients:</h5>
      <ul class="list-none w-full min-h-[40px] flex flex-wrap">
        <Pill v-if="addMeal.keywords" v-for="option in addMeal.keywords" :key="option"
          :label="helpers.capitalize(option)">
          <XMarkIcon @click="deleteKeyword(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
        </Pill>
      </ul>
    </section>
    <section>
      <h5 v-if="addMeal.categories.length > 0">Categories:</h5>
      <ul class="list-none w-full min-h-[40px] flex flex-wrap">
        <Pill v-if="addMeal.categories" v-for="(option, key) in addMeal.categories" :key="key"
          :label="helpers.capitalize(option.name)">
          <XMarkIcon @click="deleteCategory(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
        </Pill>
      </ul>
    </section>
    <section v-if="addMeal.picture">
      <PhotoIcon class="w-10 h-10 text-prime-hover cursor-pointer" />
    </section>
  </article>

  <article class="mb-20">
    <BaseComponent v-if="showName">
      <Input placeholder="Name.." @input="updateName" />
      <AddMealBtn :disabled="mealName.length === 0" label="Next.." @click="goToNext('Keywords')" />
    </BaseComponent>

    <BaseComponent v-if="showKeywords">
      <Keywords label="Add key Keywords.." @update="updateKeywords" />
      <AddMealBtn :disabled="addMeal.keywords.length === 0" label="Next.." @click="goToNext('categories')" />
    </BaseComponent>

    <BaseComponent v-if="showCategories">
      <Categories :key="componentKey" :categories="categoriesFromFetch" :deleted="deletedCategory"
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
import { useCounterStore } from '~~/stores/counter';
const store = useCounterStore();
const { user } = store;

interface IOptions {
  name: string,
  categoryId: number
}

const saving = ref(false);
const addMeal = reactive({
  title: '',
  id: 0,
  keywords: [] as string[],
  categories: [] as IOptions[],
  picture: false,
  recipe: []
})

const deletedCategory = reactive({ name: '', categoryId: 0 });
const categoriesFromFetch = reactive(user.categories);
const showName = ref(true);
const showPicture = ref(false);
const showKeywords = ref(false);
const showCategories = ref(false);
const showRecipe = ref(false);
const showAll = ref(false);
const showBtn = ref(true);
const mealName = ref('');
const componentKey = ref(0)

const toggleBtn = (evt: Event): void => {
  if ((evt.target as HTMLInputElement).id.includes('headlessui-disclosure-button')) {
    showBtn.value = !showBtn.value;
  };
};

const goToNext = (nextStep: string) => {
  switch (nextStep) {
    case 'Keywords':
      if (mealName.value !== '') {
        addMeal.title = mealName.value;
        showKeywords.value = true;
        showName.value = false;
      }
      break;
    case 'categories':
      if (addMeal.keywords.length !== 0) {
        showKeywords.value = false;
        showCategories.value = true
        addMeal.id = helpers.generateId();
      }
      break;
    case 'picture':
      if (addMeal.keywords.length !== 0) {
        showKeywords.value = false;
        showCategories.value = false;
        showPicture.value = true;
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
  addMeal.categories = addMeal.categories.filter(item => item.categoryId !== category.categoryId);
  Object.assign(deletedCategory, category)
  componentKey.value += 1
}

const updateKeywords = (updatedSelections: string) => {
  addMeal.keywords.push(updatedSelections);
}

const deleteKeyword = (deleted: string) => {
  addMeal.keywords = addMeal.keywords.filter(item => item !== deleted);
}

const addPhoto = (): void => {
  console.log('add photo');
  addMeal.picture = true;
}

const updateName = (e: Event) => {
  mealName.value = (e.target as HTMLInputElement).value
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
    const id = 2765425675;
    navigateTo(`/show-meal/${id}`)
  }, 1000);
}

</script>