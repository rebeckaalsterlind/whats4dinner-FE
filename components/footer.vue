<template>
  <footer class="flex justify-between items-center p-3">
    <div @click="() => { navigateTo('/') }">
      <HomeIcon class="h-6 w-6 text-slate-500" />
    </div>
    <div @click="() => { navigateTo('/add-meal') }" class="cursor-pointer">
      <PlusCircleIcon class="h-10 w-10 text-slate-500" />
    </div>
    <div @click="() => { navigateTo('/search') }">
      <MagnifyingGlassIcon class="h-6 w-6 text-slate-500" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, HomeIcon } from '@heroicons/vue/24/solid'
import { PlusIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

</script>