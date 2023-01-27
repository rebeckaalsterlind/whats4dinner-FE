<script lang="ts">
import { useCounterStore } from '~/stores/counter';
import { storeToRefs } from 'pinia';
const store = useCounterStore();
const { isLoggedIn, userName, userCategories, userRecipes } = storeToRefs(store);


export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

// export const helpers = {
//   capitalize,
//   generateId
// }

export const checkLogin = () => {
  const userInLS = localStorage.getItem('user')
  if (userInLS) {
    console.log('in helper, ls true');
    const user = JSON.parse(userInLS)
    userName.value = user.userName;
    userCategories.value = user.categories;
    userRecipes.value = user.recipes
    isLoggedIn.value = true;
  }
  if (!userInLS) {
    console.log('in helper. no ls');
    isLoggedIn.value = false;
    navigateTo("/my-account")
  }
}

</script>