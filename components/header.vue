<template>
  <header>
    <NuxtLink to="/">
      <Logo class="cursor-pointer w-20 h-auto" />
    </NuxtLink>
    <aside v-if="user" class="flex flex-col content-fit">
      <UserCircleIcon @click="showLogOut = true" class="h-10 w-10 text-white cursor-pointer" />
      <div class="text-white font-bold text-xl">
        {{ user.userName }}
      </div>
      <article v-if="showLogOut" class="pt-40 flex flex-col justify-center text-white">
        <NuxtLink to="/my-account">
          <p>My account</p>
        </NuxtLink>
        <p @click="signOut" class="cursor-pointer">Sign out?</p>
      </article>
    </aside>
  </header>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/20/solid';
import Logo from '@/assets/img/logo.vue';
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
const store = userStore();
const { user } = storeToRefs(store);
const showLogOut = ref(false);

const signOut = () => {
  localStorage.clear();
  user.value = undefined;
  showLogOut.value = false;
  navigateTo("/my-account")
};

</script>