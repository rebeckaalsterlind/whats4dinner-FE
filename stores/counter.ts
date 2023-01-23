import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {

  state: () => ({
    user: {
      userName: 'Kalle',
      userEmail: 'kalle@gmail.com',
      password: 'jf948yf980w34fh',
      categories: [
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
      ],
      recipes: [
        {
          title: 'pizza',
          id: 9875334647,
          keywords: [{ name: 'pizza', keywordId: 3 }, { name: 'pancake', keywordId: 1 }],
          categories: [{ name: 'soup', categoryId: 5 }, { name: 'slow cook', categoryId: 10 }],
          picture: 'pizza',
          recipe: {
            ingredients: [
              { name: 'water', amount: '2' },
              { name: 'chilli', amount: '150g' },
              { name: 'spinach', amount: '1dl' },
              { name: 'salt', amount: '2' },
            ],
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
          }
        },
        {
          title: 'pasta bolognese',
          id: 987365493,
          keywords: [{ name: 'pasta', keywordId: 3 }, { name: 'pork mince', keywordId: 1 }],
          categories: [{ name: 'favourites', categoryId: 11 }, { name: 'comfort food', categoryId: 7 }],
          picture: 'pizza',
          recipe: {
            ingredients: [
              { name: 'eggs', amount: '2' },
              { name: 'butter', amount: '150g' },
              { name: 'tomato sauce', amount: '1dl' },
              { name: 'onions', amount: '2' },
            ],
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
          }
        },
        {
          title: 'fish & chips',
          id: 2765425675,
          keywords: [{ name: 'fish', keywordId: 3 }, { name: 'potato', keywordId: 1 }],
          categories: [{ name: 'favourites', categoryId: 11 }, { name: 'healty', categoryId: 3 }],
          picture: 'pizza',
          recipe: {
            ingredients: [
              { name: 'eggs', amount: '2' },
              { name: 'butter', amount: '150g' },
              { name: 'tomato sauce', amount: '1dl' },
              { name: 'onions', amount: '2' },
            ],
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
          }
        },
        {
          title: 'chicken',
          id: 2723242565,
          keywords: [{ name: 'chicken', keywordId: 3 }, { name: 'potato', keywordId: 1 }],
          categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }],
          picture: 'pizza',
          recipe: {
            ingredients: [
              { name: 'eggs', amount: '2' },
              { name: 'butter', amount: '150g' },
              { name: 'tomato sauce', amount: '1dl' },
              { name: 'onions', amount: '2' },
            ],
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
          }
        },
        {
          title: 'Stirfry',
          id: 27287676,
          keywords: [{ name: 'noodles', keywordId: 3 }, { name: 'potato', keywordId: 1 }],
          categories: [{ name: 'vegetarian', categoryId: 1 }, { name: 'healty', categoryId: 3 }],
          picture: 'pizza',
          recipe: {
            ingredients: [
              { name: 'eggs', amount: '2' },
              { name: 'butter', amount: '150g' },
              { name: 'tomato sauce', amount: '1dl' },
              { name: 'onions', amount: '2' },
            ],
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
          }
        }
      ]
    }
  })

})
