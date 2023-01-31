import { defineStore } from 'pinia';
import { ICategory, IRecipes } from '~~/domain/types';

export const userStore = defineStore('user', () => {
    const userName = ref('')
    const user = ref({userName: '', id: ''})
    const isLoggedIn = ref(false)
    const userCategories = ref([] as ICategory[])
    const userRecipes = ref([] as IRecipes[]);
    const userList = ref([] as IRecipes[]);
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
    ])
    const selectedMeal = ref ( {
      title: '',
      id: 0,
      keywords: [] as string[],
      categories: [{ name: '', categoryId: 0 }],
      picture: '',
      recipe: {
        ingredients:
          [{ name: '', amount: '' }],
        description: ''
      }
    })

    return {
      isLoggedIn, 
      user,
      userName, 
      defaultCategories,
      userCategories,
      userRecipes,
      userList,
      selectedMeal
    }
})
