<template>
  <li
    class="mr-2 my-1 px-2 flex items-center justify-center rounded-full w-fit bg-accent-normal text-prime-normal hover:text-white">
    {{ capitalize(label) }}
    <slot />
  </li>
</template>

<script setup lang="ts">
import { capitalize } from '~~/helpers.js';
interface IPill {
  label: string
}
defineProps<IPill>()
</script>