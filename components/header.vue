<template>
  <header>
    <Logo @click="() => { navigateTo('/') }" class="cursor-pointer w-20 h-auto" />
    <aside @click="() => { navigateTo('/my-account') }" class="cursor-pointer">
      <UserCircleIcon class="h-10 w-10 text-white" />
    </aside>
  </header>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/20/solid';
import Logo from '@/assets/img/logo.vue';
</script>
