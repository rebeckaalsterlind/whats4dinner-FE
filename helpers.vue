<script lang="ts">
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
const store = userStore();
const { userCategories, userMeals, customLists, user } = storeToRefs(store);

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

export const sort = (arr: any[]) => {
  console.log('arr', arr);
  return arr.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 0 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 1));
}

export const checkLogin = () => {
  const userInLS = localStorage.getItem('user');
  if (userInLS) {
    const LSuser = JSON.parse(userInLS)
    user.value = LSuser;
    userCategories.value = sort(LSuser.categories);
    userMeals.value = LSuser.meals;
    customLists.value = LSuser.customLists;
  }
  else {
    user.value = undefined;
    navigateTo("/my-account")
  }
}

export const logout = () => {
  console.log('in logout');
  localStorage.clear();
  user.value = undefined;
  navigateTo("/my-account")
};

</script>