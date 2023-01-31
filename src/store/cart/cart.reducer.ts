import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen, setEmptyCart } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  } else if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  } else if (setEmptyCart.match(action)) {
    return CART_INITIAL_STATE;
  } else {
    return state;
  }
};
