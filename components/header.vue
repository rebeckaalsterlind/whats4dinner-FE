<template>
  <header>
    <h1 @click="() => { navigateTo('/') }" class="cursor-pointer">
      whats4dinner?
    </h1>
    <aside @click="() => { navigateTo('/my-account') }" class="cursor-pointer">
      <UserCircleIcon class="h-10 w-10 text-gray-500" />
    </aside>
  </header>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/20/solid';
</script>