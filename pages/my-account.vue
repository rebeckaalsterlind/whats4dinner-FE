<template>
  <Login v-if="!user" />
  <UserAccount v-if="user" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { checkLogin } from '~~/helpers.js';
const store = userStore();
const { user } = storeToRefs(store);
onMounted(() => checkLogin());
</script>