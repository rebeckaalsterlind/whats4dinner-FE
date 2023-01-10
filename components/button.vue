<template>
  <button class=" bg-slate-600 text-white rounded-full drop-shadow-md w-fit px-6 py-1 my-4 mx-auto">
    {{ label }}</button>
</template>

<script setup lang="ts">
interface IButton {
  label: string
}

defineProps<IButton>()

</script>