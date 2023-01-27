import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
    const userName = ref('')
    const isLoggedIn = ref(false)
    const userCategories = ref([] as ICategories[])
    const userRecipes = ref([] as IRecipes[]);
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
    const selectedMeal = ref ({
      title: '',
      id: 0,
      keywords: [] as string[],
      categories: [{ name: '', categoryId: 0 }],
      picture: '',
      recipe: {
        ingredients: [{ name: '', amount: '' }],
        description: ''
      }
    })
    if (typeof window !== 'undefined') {
      console.log('You are on the browser')
      // 👉️ can use localStorage here
      const userInLS = localStorage.getItem('user')
      if (userInLS) {
        const user = JSON.parse(userInLS)
        userName.value = user.userName;
        userCategories.value = user.categories;
        userRecipes.value = user.recipes
        isLoggedIn.value = true;
      }
    }

    return {
      isLoggedIn, 
      userName, 
      defaultCategories,
      userCategories,
      userRecipes,
      selectedMeal
    }
})

interface ICategories {
  categoryId: number, 
  name: string
}

interface IRecipes {
  title: string;
  id: number;
  keywords: string[];
  categories: { name: string, categoryId: number }[];
  picture: string | undefined;
  recipe: {
    ingredients:
      { name: string, amount: number }[];
    description: string;
  }[] | []
}

