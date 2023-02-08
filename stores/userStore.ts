import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { ICategory, IMeal, IUser, ICustomLists } from '~~/domain/types';

export const userStore = defineStore('user', () => {

    const user:Ref<IUser | undefined> = ref()
    const isLoggedIn = ref(false)
    const userCategories = ref([] as ICategory[])
    const userMeals = ref([] as IMeal[]);
    const customLists = ref([] as ICustomLists[] | any[]);
    const selectedMeal:Ref<IMeal | undefined> = ref()
    const defaultCategories = ref([
      { categoryId: 1, name: 'vegetarian' },
      { categoryId: 2, name: 'vegan' },
      { categoryId: 3, name: 'healthy' },
      { categoryId: 4, name: 'spicy' },
      { categoryId: 5, name: 'soup' },
      { categoryId: 6, name: 'salad' },
      { categoryId: 7, name: 'comfort food' },
      { categoryId: 8, name: 'quick' },
      { categoryId: 9, name: 'special' },
      { categoryId: 10, name: 'slow cook' },
      { categoryId: 11, name: 'favourites' }
    ]);

    return {
      isLoggedIn, 
      user,
      defaultCategories,
      userCategories,
      userMeals,
      customLists,
      selectedMeal
    }
})
