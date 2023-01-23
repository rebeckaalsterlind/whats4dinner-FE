<template>
  <div>
    <p>Custom page</p>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from 'nuxt/dist/pages/runtime';

definePageMeta({
  layout: "custom",
});
</script>