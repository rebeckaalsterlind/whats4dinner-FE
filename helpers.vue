<script lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { isLoggedIn, userCategories, userRecipes, userList } = storeToRefs(store);

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

export const checkLogin = () => {
  const userInLS = localStorage.getItem('user');
  const categoriesInLS = localStorage.getItem('categories');
  const recipesInLS = localStorage.getItem('recipes');
  const listInLS = localStorage.getItem('list');

  if (userInLS) {
    const user = JSON.parse(userInLS)
    user.value = user;
  }
  if (categoriesInLS) {
    const categories = JSON.parse(categoriesInLS)
    userCategories.value = categories
  }
  if (recipesInLS) {
    const recipes = JSON.parse(recipesInLS)
    userRecipes.value = recipes;
    // store.$patch((state) => {
    //   state.userRecipes.push(recipes)
    // });
  }
  if (listInLS) {
    const list = JSON.parse(listInLS)
    userList.value = list;
  }
  if (userInLS && categoriesInLS) {
    isLoggedIn.value = true;
  }
  else if (!userInLS || !categoriesInLS) {
    isLoggedIn.value = false;
    navigateTo("/my-account")
  }
}

</script>