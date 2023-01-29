<template>
  <button
    :class="[disabled && 'bg-opacity-40 text-opacity-20', 'bg-white text-prime-normal rounded-full drop-shadow-md w-fit h-10 px-4 py-1 mx-2']">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface IButton {
  label: string,
  disabled?: boolean
}

defineProps<IButton>()
</script>