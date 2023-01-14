<template>
  <BaseComponent>
    <ul class="list-none w-full min-h-[40px] flex flex-wrap">
      <li v-if="selectedCategories" v-for="(category, key) in selectedCategories" :key="key"
        class="mr-2 my-1 px-2 flex items-center rounded-full min-w-fit bg-slate-500">
        {{ category.name }}
        <XMarkIcon class="inline ml-2 h-4 w-4 cursor-pointer" @click="deleteCategory(category)" />
      </li>
    </ul>
    <Listbox class="w-full">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate">{{ label }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active }" v-for="category in allCategories || []" :key="category.id"
              :value="category" as="template">
              <li @click="updateSelected(category)" :class="[
                active ? 'text-amber-900' : 'text-gray-900',
                'relative cursor-pointer select-none py-2 pl-10 pr-4'
              ]">
                {{ category.name }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </BaseComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid'
const emit = defineEmits(['update'])

interface IOptions {
  id: number,
  name: string,
}

interface ICategories {
  categories: IOptions[],
  label: string,
}

const { categories, label } = defineProps<ICategories>()
const selectedCategories = ref([] as IOptions[]);
const allCategories = ref(categories);

const updateSelected = (category: IOptions) => {
  allCategories.value = allCategories.value.filter(item => item.id !== category.id);
  selectedCategories.value.push(category);
  emit('update', selectedCategories.value);
}

const deleteCategory = (category: IOptions) => {
  selectedCategories.value = selectedCategories.value.filter(item => item.id !== category.id);
  allCategories.value.push(category)
  emit('update', selectedCategories.value);
}

</script>

