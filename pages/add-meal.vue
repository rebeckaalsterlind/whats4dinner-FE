<template>
  <h2 class="mx-auto">Add new meal:</h2>
  <BaseComponent>
    <Input placeholder="Meal.." />
    <SearchBar class="drop-shadow-sm" label="Add key ingredients.." />
    <div class="flex items-center" @click="addPhoto">
      <PhotoIcon class="w-6 h-6 cursor-pointer" />
      <PlusIcon class="w-4 h-4" />
    </div>
  </BaseComponent>
  <Dropdown :categories="categories" label="Add categories.." v-model="selectedOption" />
  <Disclosure class="mt-10" label="Add recipe?">
    <DisclosureContent label="Recipe goes here!" />
  </Disclosure>
  <Button :label="saving ? 'Saving...' : 'Save'" @click="handleSave" />
</template>

<script setup lang="ts">
import { PhotoIcon, PlusIcon } from '@heroicons/vue/24/outline';
import categories from '~~/assets/data/categories.vue';

const selectedOption = reactive([]);
const selectedCategories = reactive([]);
const saving = ref(false);
const addPhoto = (): void => {
  console.log('add photo');
}


const checkModelvalue = () => {
  console.log('selectedOption in add-recipe', selectedOption);
}

const handleSave = () => {
  saving.value = true;
  //await post
  setTimeout(function () {
    saving.value = false;
    navigateTo('/')
  }, 1000);


}
watch(selectedOption, checkModelvalue);

</script>