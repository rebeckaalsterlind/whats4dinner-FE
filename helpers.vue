<script lang="ts">
import { useCounterStore } from '~/stores/counter';
import { storeToRefs } from 'pinia';
const store = useCounterStore();
const { isLoggedIn } = storeToRefs(store);


export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

export const helpers = {
  capitalize,
  generateId
}

export const checkUser = () => {
  if (localStorage.getItem('user')) isLoggedIn.value = true;
}
</script>