<template>
  <section>
    <Listbox v-model="selectedCategory" @update:modelValue="value => emit('update:modelValue', value)">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate">{{ selectedCategory.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

          </span>
        </ListboxButton>
        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="category in categories || []" :key="category.id"
              :value="category" as="template">
              <li :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]">
                <span :class="[
                  selected ? 'font-medium bg-slate-200' : 'font-normal',
                  'block truncate',
                ]">{{ category.name }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <p v-if="selectedCategory.id !== 0"> {{ selectedCategory.name }}</p>
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

const emit = defineEmits(['update:modelValue'])

interface IOptions {
  id: number,
  name: string
}
interface ICategories {
  categories: IOptions[],
  label: string
}

const { categories, label } = defineProps<ICategories>()
const selectedCategory = ref({ id: 0, name: label })

</script>

