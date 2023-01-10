<template>
  <section>
    <div class="h-10 ">
      <p v-if="selectedCategory.id !== 0"> {{ selectedCategory.name }} x</p>
    </div>
    <Listbox class="w-full" v-model="selectedCategory" @update:modelValue="value => emit('update:modelValue', value)">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate">{{ selectedCategory.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="category in categories || []" :key="category.id"
              :value="category" as="template">
              <li @click="category.selected = !category.selected" :class="[
                active ? 'text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
                category.selected ? 'bg-gray-800 text-white' : 'white'
              ]">
                {{ category.name }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </section>
</template>

//todo : select multiple options

<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const emit = defineEmits(['update:modelValue'])

interface IOptions {
  id: number,
  name: string,
  selected: boolean
}
interface ICategories {
  categories: IOptions[],
  label: string,
}

const { categories, label } = defineProps<ICategories>()
const selectedCategory = ref({ id: 0, name: label, selected: false })
const test = (): void => {
  console.log('in test', selectedCategory.value);
}
</script>

