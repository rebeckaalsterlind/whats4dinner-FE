<template>
  <button class="border border-white text-white rounded-full fit-content drop-shadow-md h-10 px-4 py-1 mx-2 break-keep">
    {{ label }}
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IButton {
  label: string,
  disabled?: boolean
}

defineProps<IButton>()
</script>