<template>
  <footer class="flex justify-between items-center p-3">
    <div @click="() => { navigateTo('/suggest-meals') }" class="cursor-pointer">
      <LightBulbIcon class="h-8 w-8 text-accent-normal hover:text-white" />
    </div>
    <div @click="() => { navigateTo('/add-meal') }" class="cursor-pointer">
      <PlusCircleIcon class="h-8 w-8 text-accent-normal hover:text-white" />
    </div>
    <div @click="() => { navigateTo('/search') }" class="cursor-pointer">
      <MagnifyingGlassIcon class="h-8 w-8 text-accent-normal hover:text-white" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, LightBulbIcon } from '@heroicons/vue/24/solid'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'

</script>

<style>
footer {
  color: rgb(199, 103, 0)
}
</style>