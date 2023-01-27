export interface IRecipes {
  title: string,
  id: number,
  keywords: string[],
  categories: { name: string, categoryId: number }[],
  picture: string,
  recipe: {
    ingredients:
      { name: string, amount: number }[],
    description: string;
  }
}

export interface IResponse {
  status: boolean,
  body: IUser
}

export interface IUser {
  userName: string;
  _id: string;
  password: string;
  categories: [];
  recipes: []
}