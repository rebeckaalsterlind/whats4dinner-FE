import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const name = ref('Rebecka');
  return {count, name };
})
