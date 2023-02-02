<template>
  <button :class="disabled && 'bg-opacity-40 text-opacity-20'"
    class="bg-white text-prime-normal rounded-full drop-shadow-md h-10 px-4 py-1 mx-1">
    {{ label }}</button>
</template>

<script setup lang="ts">
interface IButton {
  label: string,
  disabled?: boolean
}

defineProps<IButton>()
</script>