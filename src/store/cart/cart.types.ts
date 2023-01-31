import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_IS_CART_OPEN = "SET_IS_CART_OPEN",
  SET_CART_COUNT = "SET_CART_COUNT",
  SET_CART_TOTAL = "SET_CART_TOTAL",
  CART_RESET = "CART_RESET",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
