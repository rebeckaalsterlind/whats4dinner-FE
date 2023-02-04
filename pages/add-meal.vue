<template>
  <section class="mb-20 mx-4 grow flex flex-col justify-between">
    <article>
      <h1 class="text-center text-accent-normal font-bold text-xl">Add new meal</h1>
      <h2 class="mt-0 text-center font-bold text-xl">
        {{ capitalize(addMeal.title) || '' }}
      </h2>
      <section class="my-4">
        <h5 v-if="addMeal.keywords.length > 0">Key ingredients:</h5>
        <ul class="list-none w-full min-h-[40px] flex flex-wrap">
          <Pill v-if="addMeal.keywords" v-for="option in addMeal.keywords" :key="option" :label="capitalize(option)">
            <XMarkIcon @click="deleteKeyword(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
          </Pill>
        </ul>
      </section>
      <section>
        <h5 v-if="addMeal.categories.length > 0">Categories:</h5>
        <ul class="list-none w-full min-h-[40px] flex flex-wrap">
          <Pill v-if="addMeal.categories" v-for="(option, key) in addMeal.categories" :key="key"
            :label="capitalize(option.name)">
            <XMarkIcon @click="deleteCategory(option)" class="inline text-prime-normal ml-2 h-4 w-4 cursor-pointer" />
          </Pill>
        </ul>
      </section>
      <section v-if="addPhoto" class="my-4">
        <img :src="imgSrc" :alt="addMeal.title" class="w-36 rounded-lg" />
      </section>
    </article>

    <article class="items-start">
      <Input v-if="showName" placeholder="Name.." @input="updateName" />

      <Keywords v-if="showKeywords" label="Add key ingredients.." @update="updateKeywords" />

      <Categories v-if="showCategories" :key="componentKey" :deleted="deletedCategory" label="Select categories.."
        @update="updateCategories" />

      <BaseComponent v-if="showPicture && !addPhoto" class="flex flex-row justify-evenly items-center">
        <label for="file">
          <PhotoIcon required class="w-16 h-16 hover:text-accent-normal active:text-white cursor-pointer " />
        </label>
        <CameraIcon v-if="!selectedFile" class="w-16 h-16 hover:text-accent-normal active:text-white cursor-pointer " />
        <input id="file" type="file" :name="addMeal.title" @change="onFileSelected" required class="hidden">
        <span v-if="selectedFile"> {{ selectedFile.name }}</span>
        <button v-if="selectedFile" @click="onUpload"
          class="border border-white rounded-full px-4 hover:text-accent-normal hover:border-accent-normal active:text-white active:border-white">Upload</button>
      </BaseComponent>

      <AddRecipe v-if="showRecipe" @addRecipe="addRecipe" @click="toggleBtn" />
    </article>

    <article class="flex justify-center">
      <AddMealBtn v-if="showName" :disabled="mealName.length === 0" label="Next.." @click="goToNext('keywords')" />
      <AddMealBtn v-if="showKeywords" :disabled="addMeal.keywords.length === 0" label="Next.."
        @click="goToNext('categories')" />
      <AddMealBtn v-if="showCategories" :disabled="addMeal.categories.length === 0" label="Next.."
        @click="goToNext('picture')" />
      <Button v-if="showPicture && !addPhoto" label="'Skip?" @click="goToNext('recipe')" />
      <Button v-if="showRecipe && !showAll" label="Skip?" @click="goToNext('done')" />
      <Button v-if="showAll" :label="saving ? 'Saving...' : 'Save meal'" class="bg-accent-normal text-prime-normal"
        @click="handleSave" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { PhotoIcon, CameraIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { checkLogin, capitalize, generateId } from '@/helpers.vue';
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
import { Ref } from '@vue/runtime-core';
import axios from 'axios';
const store = userStore();
const { user, userCategories, userRecipes, selectedMeal } = storeToRefs(store);

interface IOptions {
  name: string,
  categoryId: number
}
interface IRecipe {
  ingredients: [{ name: string, amount: string }],
  description: string
}

const saving = ref(false);

const addMeal = reactive({
  title: '',
  id: 0,
  keywords: [] as string[],
  categories: [] as IOptions[],
  picture: '',
  recipe: {
    ingredients: [{ name: '', amount: '' }],
    description: ''
  }
})


const deletedCategory = reactive({ name: '', categoryId: 0 });
const showName = ref(true);
const showPicture = ref(false);
const addPhoto = ref(false);
const showKeywords = ref(false);
const showCategories = ref(false);
const showRecipe = ref(false);
const showAll = ref(false);
const showBtn = ref(false);
const mealName = ref('');
const componentKey = ref(0)
const selectedFile: Ref<FileList | null | any> = ref(null)
const imgSrc = ref('')

const onFileSelected = (evt: Event) => {
  if ((evt.target as HTMLInputElement).files) {
    selectedFile.value = (evt.target as HTMLInputElement).files![0]
  }
}

const onUpload = () => {
  imgSrc.value = URL.createObjectURL(selectedFile.value);
  addPhoto.value = true;
  showPicture.value = false
  showRecipe.value = true

  console.log('addMeal.picture', addMeal.picture);


  axios.get('https://api.spoonacular.com/recipes/autocomplete?number=10&query=chick')
    .then(res => {
      console.log('res', res.data)
    })
}

const toggleBtn = (evt: Event): void => {
  if ((evt.target as HTMLInputElement).id.includes('headlessui-disclosure-button')) {
    showBtn.value = !showBtn.value;
  };
};

const goToNext = (nextStep: string) => {
  switch (nextStep) {
    case 'keywords':
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
        addMeal.id = generateId();
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

const updateName = (e: Event) => {
  mealName.value = (e.target as HTMLInputElement).value
}

const addRecipe = (recipe: IRecipe) => {
  addMeal.recipe = recipe;
  showAll.value = true;
}

const handleSave = async () => {
  console.log('addmeal', addMeal.picture);
  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)


    // //save image
    // console.log('selectedFile', selectedFile.value);
    // const fd = new FormData();
    // fd.append('image', selectedFile.value, LSuser.id + '_' + addMeal.title + '.jpg')
    // console.log('after', fd);
    // axios.post('http://localhost:3030/images/saveImage', fd)
    //   .then(res => {
    //     console.log('res', res.data)
    //   })



    //save meal
    const saveMeal = await $fetch('http://localhost:3030/meals/addMeal', {
      method: 'POST',
      body: { id: LSuser.id, meal: addMeal }
    });

    localStorage.setItem('recipes', JSON.stringify(saveMeal));
    //subscribe to ls instead?
    store.$patch((state) => state.userRecipes.push(addMeal))
    selectedMeal.value = addMeal
    saving.value = false;

    navigateTo('/show-meal')
  } else {
    navigateTo('/my-account')
  }

}

onMounted(() => checkLogin());
</script>