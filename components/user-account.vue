<template>
  <PageTitle label="My account" />
  <article v-if="user" class="flex flex-col gap-8 mx-4 bg-white bg-opacity-10 rounded-lg p-4">
    <section class="flex gap-4 justify-center items-center">
      <UserCircleIcon class="h-16 w-16 text-white cursor-pointer" />
      <div>
        <h3>Username: {{ user.userName }}</h3>
        <h3>Password: *************</h3>
        <h3 class="cursor-pointer hover:text-accent-normal active:text-white" @click="logout">Sign out?</h3>
      </div>
    </section>
    <section class="flex flex-col gap-4">
      <div>
        <AddCategory v-if="showAddCategory" v-model="addCategory" />
        <Listbox>
          <ListboxButton
            class="w-full justify-between bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm hover:text-accent-normal active:text-white flex items-center gap-2">
            Food categories
            <ChevronDownIcon class="w-4 h-4" />
          </ListboxButton>
          <ListboxOptions>
            <ListboxOption v-for="category in userCategories" :key="category.categoryId" :value="category" as="template"
              v-slot="{ active, selected }">
              <li
                class="bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm hover:text-accent-normal active:text-white flex items-center gap-2"
                :class="{
                  'bg-prime-normal text-accent-normal': active,
                  'bg-white bg-opacity-10 text-white': !active,
                }">
                {{ capitalize(category.name) }}
                <XMarkIcon v-show="active" @click="deleteCategory(category.categoryId)"
                  class="w-4 h-4 inline cursor-pointer" />
              </li>
            </ListboxOption>
            <li @click="showAddCategory = true"
              class="bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm flex items-center gap-2 hover:text-accent-normal hover:bg-prime-normal active:text-white">
              Add new category
              <PlusIcon class="w-4 h-4" />
            </li>
          </ListboxOptions>
        </Listbox>
      </div>
      <div>
        <Listbox>
          <ListboxButton
            class="w-full justify-between bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm hover:text-accent-normal active:text-white flex items-center gap-2">
            Saved meals
            <ChevronDownIcon class="w-4 h-4" />
          </ListboxButton>
          <ListboxOptions>
            <ListboxOption v-for="meal in userMeals" :key="meal.id" :value="meal" as="template"
              v-slot="{ active, selected }">
              <li
                class="bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm cursor-pointer hover:text-accent-normal active:text-white flex items-center gap-2"
                :class="{
                  'bg-prime-normal text-accent-normal': active,
                  'bg-white bg-opacity-10 text-white': !active,
                }">
                <span @click="goToMeal(meal)" class="cursor-pointer">{{ capitalize(meal.title) }}</span>
                <XMarkIcon v-show="active" @click="deleteMeal(meal)" class="w-4 h-4 inline cursor-pointer" />
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
      </div>
      <div>
        <Listbox>
          <ListboxButton
            class="w-full justify-between bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm hover:text-accent-normal active:text-white flex items-center gap-2">
            My lists
            <ChevronDownIcon class="w-4 h-4" />
          </ListboxButton>
          <ListboxOptions>
            <ListboxOption v-for="(list, index) in customLists" :key="index" as="template"
              v-slot="{ active, selected }">
              <li
                class="bg-white bg-opacity-10 h-8 my-1 p-2 rounded-lg text-sm hover:text-accent-normal active:text-white flex items-center gap-2"
                :class="{
                  'bg-prime-normal text-accent-normal': active,
                  'bg-white bg-opacity-10 text-white': !active,
                }">
                {{ capitalize(list.name) }}
                <XMarkIcon v-show="active" @click="deleteCustomList(list.id)" class="w-4 h-4 inline" />
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { UserCircleIcon, XMarkIcon, ChevronDownIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { checkLogin, capitalize, logout } from '~~/helpers.vue';
import { IMeal } from '~~/domain/types';
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
const store = userStore();
const { user, userCategories, userMeals, selectedMeal, customLists } = storeToRefs(store);
const showAddCategory = ref(false);
const addCategory = ref();

const goToMeal = (meal: IMeal) => {
  selectedMeal.value = meal
  navigateTo("/show-meal")
};

const addCategoryToList = () => {
  showAddCategory.value = false;
};

const deleteMeal = async (meal: IMeal) => {
  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    try {
      const { data } = await useFetch('http://localhost:3030/meals/deleteMeal', {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: { id: LSuser._id, meal: meal }
      });
      localStorage.setItem('user', JSON.stringify(data.value));
      checkLogin();
    } catch (error) {
      console.log('error', error);
    }
  } else {
    navigateTo('/my-account')
  }
};

const deleteCategory = async (categoryId: number) => {
  const updatedCategories = userCategories.value.filter((category: { categoryId: number; }) => category.categoryId !== categoryId)
  userCategories.value = updatedCategories;
  const userInLS = localStorage.getItem('user');

  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    try {
      const { data } = await useFetch('http://localhost:3030/categories/deleteCategory', {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: { id: LSuser._id, categoryId: categoryId }
      });
      localStorage.setItem('user', JSON.stringify(data.value));
      checkLogin();
    } catch (error) {
      console.log('error', error);
    }
  } else {
    navigateTo('/my-account')
  }
};


const deleteCustomList = async (listId: number) => {
  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    try {
      const { data } = await useFetch('http://localhost:3030/customLists/deleteCustomList', {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: { id: LSuser._id, listId: listId }
      });
      localStorage.setItem('user', JSON.stringify(data.value));
      checkLogin();
    } catch (error) {
      console.log('error', error);
    }
  } else {
    navigateTo('/my-account')
  }
};

onMounted(() => {
  checkLogin()
  userMeals.value.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 0 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 1));
});
watch(addCategory, addCategoryToList);
</script>