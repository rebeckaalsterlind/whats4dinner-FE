<template>
  <header>
    <NuxtLink to="/">
      <Logo class="cursor-pointer w-20 h-auto" />
    </NuxtLink>
    <aside v-if="user"
      class="fixed right-6 top-4 font-black text-lg text-accent-normal hover:text-white flex flex-col gap-4">
      <Menu>
        <MenuButton class="text-right cursor-pointer">{{ capitalize(user.userName) }}</MenuButton>
        <MenuItems class="flex flex-col text-right gap-2">
          <MenuItem v-slot="{ close }">
          <NuxtLink class="cursor-pointer hover:text-accent-normal text-sm text-white" to="/my-account">
            My account
          </NuxtLink>
          </MenuItem>
          <MenuItem v-slot="{ close }">
          <p class="cursor-pointer hover:text-accent-normal text-sm text-white" @click="logout">
            Sign out
          </p>
          </MenuItem>
        </MenuItems>
      </Menu>
    </aside>
  </header>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Logo from '@/assets/img/logo.vue';
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { capitalize, logout } from '~~/helpers.js'
const store = userStore();
const { user } = storeToRefs(store);
</script>