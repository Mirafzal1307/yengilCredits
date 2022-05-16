import { ADD_TO_CART, REMOVE_FROM_CART } from "../../types/cartType";

export const addToCart = (product: any) => (dispatch: any, getState: any) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x: any) => {
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product: any) => (dispatch: any, getState: any) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x: any) => x._id !== product._id);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
