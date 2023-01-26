import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {

  state: () => {
    return {
   
      isLoggedIn: false,

      user: {userName: '', password: ''},
      
      userCategories: [] as ICategories[],

      userRecipes: [] as IRecipes[],

      selectedMeal: {
        title: '',
        id: 0,
        keywords: [],
        categories: [{ name: '', categoryId: 0 }],
        picture: '',
        recipe: {
          ingredients: [{ name: '', amount: '' }],
          description: ''
        }
      },

      defaultCategories: [
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
      ]
    }
  },
  
  actions: {
    handleLoggedIn(newValue: boolean) {
      this.isLoggedIn = newValue
    }
  }

})

interface IUser {
  userName: string;
  password: string;
}

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

