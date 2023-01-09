<template>
  <section class="flex flex-row col-span-5 border-l-orange-700">
    <Dropdown :categories="categories" label="Select categories.." v-model="selectedOption" />
    <SearchBar class="border" />
  </section>
</template>

<script setup lang="ts">
const selectedOption = ref('');
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

const checkModelvalue = () => {
  console.log('selectedOption in add-recipe', selectedOption.value);
}

watch(selectedOption, checkModelvalue);

</script>