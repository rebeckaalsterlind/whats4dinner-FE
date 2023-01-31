<template>
  <div>
    <article v-if="!isLoggedIn" class="pt-40 flex justify-center text-white">
      <section v-if="!createUser" class="flex flex-col gap-4 items-center text-prime-normal">
        <p v-if="loginFail" class="text-white">{{ errorMsg }}</p>
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
    <article v-if="isLoggedIn">Profile</article>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { IResponse, IUser } from '~~/domain/types';
import { checkLogin } from '~~/helpers.vue';
const store = userStore();
const { userName, userCategories, userRecipes, defaultCategories, isLoggedIn } = storeToRefs(store);

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
  console.log('response', response);
  errorMsg.value = '';
  localStorage.setItem('user', JSON.stringify({ userName: response.userName, id: response._id }));
  localStorage.setItem('recipes', JSON.stringify(response.recipes));
  localStorage.setItem('categories', JSON.stringify(response.categories));
  if (response.list) localStorage.setItem('list', JSON.stringify(response.list));
  //set lists in ls too?
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
    recipes: recipes || []
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

const recipes = [
  {
    title: 'pizza',
    id: 9875334647,
    keywords: ['pizza', 'pancake'],
    categories: [{ name: 'soup', categoryId: 5 }, { name: 'slow cook', categoryId: 10 }],
    picture: 'pizza',
    recipe: {
      ingredients: [
        { name: 'water', amount: '2' },
        { name: 'chilli', amount: '150g' },
        { name: 'spinach', amount: '1dl' },
        { name: 'salt', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'pasta bolognese',
    id: 987365493,
    keywords: ['pasta', 'pork mince'],
    categories: [{ name: 'favourites', categoryId: 11 }, { name: 'comfort food', categoryId: 7 }],
    picture: 'pizza',
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'fish & chips',
    id: 2765425675,
    keywords: ['fish', 'potato'],
    categories: [{ name: 'favourites', categoryId: 11 }, { name: 'healty', categoryId: 3 }],
    picture: 'pizza',
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'chicken',
    id: 2723242565,
    keywords: ['chicken', 'potato'],
    categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }],
    picture: 'pizza',
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  },
  {
    title: 'Stirfry',
    id: 27287676,
    keywords: ['noodles', 'potato'],
    categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }],
    picture: 'pizza',
    recipe: {
      ingredients: [
        { name: 'eggs', amount: '2' },
        { name: 'butter', amount: '150g' },
        { name: 'tomato sauce', amount: '1dl' },
        { name: 'onions', amount: '2' },
      ],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
    }
  }
]
onMounted(() => checkLogin());
</script>