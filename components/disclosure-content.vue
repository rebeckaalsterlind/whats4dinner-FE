<template>
  <article>
    {{ label }}
  </article>
</template>

<script setup lang="ts">
interface IContent {
  label: string
}
defineProps<IContent>()

</script>