<script lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { isLoggedIn, userCategories, userMeals, userList, user } = storeToRefs(store);

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

export const checkLogin = () => {
  const userInLS = localStorage.getItem('user');

  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    user.value = LSuser;
    // console.log('user in helper', user.categories);
    userCategories.value = LSuser.categories;
    userMeals.value = LSuser.meals;
    console.log('userCategories', userCategories.value);
    if (LSuser.list) userList.value = LSuser.list
    isLoggedIn.value = true

  }
  // if (categoriesInLS) {
  //   const categories = JSON.parse(categoriesInLS)
  //   userCategories.value = categories
  // }
  // if (recipesInLS) {
  //   const recipes = JSON.parse(recipesInLS)
  //   userMeals.value = recipes;
  //   // store.$patch((state) => {
  //   //   state.userMeals.push(recipes)
  //   // });
  // }
  // if (listInLS) {
  //   const list = JSON.parse(listInLS)
  //   userList.value = list;
  // }
  // if (userInLS && categoriesInLS) {
  //   isLoggedIn.value = true;
  // }
  else {
    console.log('no use5', user);
    user.value = undefined;
    navigateTo("/my-account")
  }
}

</script>