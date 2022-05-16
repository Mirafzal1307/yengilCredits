import { ADD_TO_CART, REMOVE_FROM_CART } from "../../types/cartType";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action: any
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
