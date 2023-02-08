<template>
  <article v-if="!user" class="pt-40 flex justify-center text-white">
    <section v-if="!createUser" class="flex flex-col gap-4 items-center text-prime-normal">
      <p v-if="loginFail && errorMsg" class="text-white">{{ errorMsg }}</p>
      <Input id="username" type="text" placeholder="Username.." @input="handleInput" />
      <Input id="password" type="password" placeholder="Password.." @input="handleInput" />
      <Button label="Log in" @click="logIn" />
      <p @click="createUser = true, userTaken = false" class="text-white">Create account?</p>
    </section>
    <section v-if="createUser" class="flex flex-col gap-4 items-center text-prime-normal">
      <p class="text-white">{{ errorMsg }}</p>
      <Input id="username" type="text" placeholder="Username.." @input="handleInput" />
      <Input id="password" type="password" placeholder="Password" @input="handleInput"
        :class="isMatching && 'border border-success-500'" />
      <Input id="confirm" type="password" placeholder="Confirm password" @input="handleInput"
        :class="isMatching && 'border border-success-500'" />
      <Button label="Register" @click="register" />
      <p @click="createUser = false, loginFail = false" class="text-white">Or log in?</p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { IResponse, IUser } from '~~/domain/types';
import { checkLogin } from '~~/helpers.vue';
const store = userStore();
const { user, defaultCategories } = storeToRefs(store);

const loginFail = ref(false);
const createUser = ref(false);
const errorMsg = ref();
const userTaken = ref(false);
const userLogin = ref({ userName: '', password: '' })
const confirmPassword = ref();
const isMatching = ref(false);

const handleInput = (e: Event): void => {
  if ((e.target as HTMLInputElement).id === 'username') {
    userLogin.value.userName = (e.target as HTMLInputElement).value;
  } else if ((e.target as HTMLInputElement).id === 'password') {
    userLogin.value.password = (e.target as HTMLInputElement).value;
  } else if ((e.target as HTMLInputElement).id === 'confirm') {
    confirmPassword.value = (e.target as HTMLInputElement).value;
  }
  if (userLogin.value.password === confirmPassword.value) isMatching.value = true;
};

//set user from fetch response
const setUser = (response: IUser) => {
  errorMsg.value = '';
  localStorage.setItem('user', JSON.stringify(response));
  checkLogin();
  navigateTo('/');
}

const logIn = async () => {
  loginFail.value = false;
  errorMsg.value = '';
  const getUser = await $fetch<IResponse>('http://localhost:3030/users/login/', {
    method: 'POST',
    body: userLogin.value
  })
  if (getUser.status) {
    setUser(getUser.body)
  } else {
    loginFail.value = true;
    errorMsg.value = getUser.body;
  }
}

const register = async () => {

  loginFail.value = false;
  userTaken.value = false;

  const newUser = {
    userName: userLogin.value.userName,
    password: userLogin.value.password,
    categories: defaultCategories.value,
    meals: [],
    customLists: []
  };

  if (isMatching.value) {
    errorMsg.value = '';
    const registerUser = await $fetch<IResponse>('http://localhost:3030/users/registerUser', {
      method: 'POST',
      body: newUser
    });
    if (registerUser.status) {
      setUser(registerUser.body);
    } else {
      userTaken.value = true;
      errorMsg.value = registerUser.body;
    };
  } else {
    errorMsg.value = 'Passwords are not matching';
  }

};

</script>