<template>
  <footer class="flex justify-between items-center p-3">
    <div @click="() => { navigateTo('/') }">Home</div>
    <div @click="() => { navigateTo('/add-recipe') }">+</div>
    <div @click="() => { navigateTo('/search') }">Search</div>
  </footer>
</template>