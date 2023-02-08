
export interface ICategory {
  categoryId: number, 
  name: string
}

export interface IResponse {
  status: boolean,
  body: IUser
}

export interface IUser {
  userName: string;
  _id: string;
  password: string;
  categories: ICategory[];
  meals: IMeal[] | any[];
  customLists: IMeal[] | any[];
}

export interface IIngredient {
  name: string;
  amount: string;
}

export interface IRecipe {
  servings: undefined | string,
  ingredients: IIngredient[],
  instructions: string
}

export interface IMeal {
  title: string,
  id: string | undefined;
  categories: ICategory[] | any[];
  picture: string;
  recipe: IRecipe;
}

export interface ICustomLists {
  name: string;
  id: number;
  list: IMeal[];
}