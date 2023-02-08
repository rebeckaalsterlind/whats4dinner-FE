<template>
  <AddCategory v-if="showAddCategory" v-model="addCategory" />
  <Listbox class="w-full">
    <div>
      <ListboxButton
        class="relative w-full cursor-default rounded-lg bg-white bg-opacity-10 text-white py-2 pl-3 pr-10 text-left">
        <span class="block truncate">{{ label }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      </ListboxButton>
      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions class="h-fit w-full overflow-auto rounded-md bg-white bg-opacity-10 mt-1 py-1 text-base
          drop-shadow-lg ">
          <ListboxOption v-for="category in allCategories || []" :key="componentKey" :value="category" as="template">
            <li @click="updateSelected(category)"
              class="bg-opacity-10 relative cursor-pointer select-none bg-white hover:text-accent-normal hover:bg-prime-normal active:text-white py-2 pl-10 pr-4 rounded-lg m-1">
              {{ capitalize(category.name) }}
            </li>
          </ListboxOption>
          <li @click="showAddCategory = true"
            class="bg-opacity-10 relative cursor-pointer select-none bg-white hover:text-accent-normal hover:bg-prime-normal active:text-white py-2 pl-10 pr-4 rounded-lg m-1">
            Add new category</li>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia';
import { ICategory } from '~~/domain/types';
import { generateId, capitalize, sort, checkLogin } from '~~/helpers.vue';
import { userStore } from '~~/stores/userStore';
const store = userStore();
const { defaultCategories, user } = storeToRefs(store);

interface IHandleCategories {
  label: string,
  deleted: ICategory
}

const { deleted, label } = defineProps<IHandleCategories>()
const emit = defineEmits(['update'])
const allCategories = reactive(defaultCategories.value);
const showAddCategory = ref(false);
const addCategory = ref();
const componentKey = ref(0)

const updateSelected = (category: ICategory) => {
  const remainingCategories = allCategories.findIndex(item => item.categoryId === category.categoryId);
  allCategories.splice(remainingCategories, 1)
  emit('update', category);
}

const deleteCategory = () => {
  const findDouble = allCategories.find(item => item.categoryId === deleted.categoryId);
  if (!findDouble) allCategories.push(deleted)
  componentKey.value += 1
}

const addCategoryToList = () => {
  showAddCategory.value = false;
  allCategories.push(addCategory.value);
  sort(allCategories);
}

watch(deleted, deleteCategory)
watch(addCategory, addCategoryToList);
onMounted(() => {
  sort(allCategories);
});

</script>

