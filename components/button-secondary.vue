<template>
  <button
    class="flex gap-2 items-center border border-white text-white hover:text-accent-normal hover:border-accent-normal active:text-white active:border-white rounded-full w-fit min-w-[80px] drop-shadow-md px-4 py-1 mx-2 break-keep">
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