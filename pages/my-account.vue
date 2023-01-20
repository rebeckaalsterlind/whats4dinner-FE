<template>
  <article v-if="!isLoggedIn" class="pt-40 flex justify-center">
    <section v-if="!createUser" class="flex flex-col gap-4 items-center text-prime-normal">
      <Input type="email" placeholder="Email.." />
      <Input type="password" placeholder="Password" />
      <Button label="Log in" @click="logIn" />
      <p @click="createUser = true" class="text-white">Create accound?</p>
    </section>
    <section v-if="createUser" class="flex flex-col gap-4 items-center text-prime-normal">
      <Input type="text" placeholder="Username.." />
      <Input type="email" placeholder="Email.." />
      <Input id="first" type="password" placeholder="Password" @input="checkPassword"
        :class="isMatching && 'border border-success-500'" />
      <Input id="second" type="password" placeholder="Confirm password" @input="checkPassword"
        :class="isMatching && 'border border-success-500'" />
      <Button label="Register" @click="register" />
      <p @click="createUser = false" class="text-white">Or log in?</p>
    </section>
  </article>

  <article v-if="isLoggedIn" class="pt-40 flex justify-center">
    <section v-if="!createUser" class="flex flex-col gap-4 items-center text-prime-normal">
      <p class="text-white">Render user data here ()</p>
      <ul class="text-white">
        <li>Username: Kalle</li>
        <li>Email: Kalle@gmail.com </li>
        <li>Password: *******</li><br />
      </ul>
      <Button label="Sign out?" @click="signOut" />
    </section>
  </article>

</template>

<script setup lang="ts">
const isLoggedIn = ref(false);
const createUser = ref(false)
const passwordOne = ref();
const passwordTwo = ref();
const isMatching = ref(false);

const checkUser = () => {
  if (localStorage.getItem('user')) isLoggedIn.value = true;
}

const logIn = () => {
  console.log('post this');
  //post and get ok back from request => save to ls
  //set global state to logged in
  const userName = 'usernamefromfetch';
  localStorage.setItem('user', userName);
  checkUser();
  //redirect
}

const register = () => {
  console.log('jh');
  if (isMatching) {
    console.log('passwords are matching');
    logIn()
  }
}

const signOut = () => {
  localStorage.removeItem('user');
  isLoggedIn.value = false;
  //redirect
}

const checkPassword = async (e: Event): Promise<void> => {
  const input = (e.target as HTMLInputElement);
  if (input.id === 'first') passwordOne.value = input.value;
  if (input.id === 'second') passwordTwo.value = input.value;
  if (passwordOne.value === passwordTwo.value) isMatching.value = true;
};

onMounted(() => {
  checkUser();
});

</script>