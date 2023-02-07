<script lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { isLoggedIn, userCategories, userMeals, customLists, user } = storeToRefs(store);

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

export const checkLogin = () => {


  // if response comes back with null, dont set user in ls!!?? 
  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    user.value = LSuser;
    userCategories.value = LSuser.categories;
    userMeals.value = LSuser.meals;
    if (LSuser.customLists) {
      customLists.value = LSuser.customLists
      console.log('ls custom', LSuser.customLists, customLists.value);
    }
    isLoggedIn.value = true
  }
  else {
    user.value = undefined;
    navigateTo("/my-account")
  }
}

</script>