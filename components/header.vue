<template>
  <header>
    <Logo @click="() => { navigateTo('/') }" class="cursor-pointer w-20 h-auto" />
    <aside v-if="isLoggedIn" class="flex flex-col content-fit">
      <UserCircleIcon @click="showOptions" class="h-10 w-10 text-white cursor-pointer" />
      <div class="text-white font-bold text-xl">
        {{ userName }}
      </div>
      <article v-if="showLogOut" class="pt-40 flex justify-center text-white">
        <p>My account</p>
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
//import { checkUser } from '~~/helpers.vue';
const store = userStore();
const { userName, isLoggedIn } = storeToRefs(store);
const showLogOut = ref(false);

const signOut = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  userName.value = '';
  showLogOut.value = false;
  navigateTo("/my-account")
};

const showOptions = () => {
  showLogOut.value = true
}


// onMounted(() => {
//   var getUser = localStorage.getItem('user')
//   if (getUser) {
//     console.log('get user in  header', getUser);
//     const user = JSON.parse(getUser)
//     isLoggedIn.value = true;
//     userName.value = user.userName;
//   }
// });

</script>