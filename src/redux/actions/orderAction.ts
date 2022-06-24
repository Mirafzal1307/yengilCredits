import {
  CREATE_ORDER,
  CLEAR_CART,
  CLEAR_ORDER,
  FETCH_ORDERS,
} from "../../types/cartType";

export const createOrder = (order: any) => (dispatch: any) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
      localStorage.clear();
      dispatch({ type: CLEAR_CART });
    });
};
export const clearOrder = () => (dispatch: any) => {
  dispatch({ type: CLEAR_ORDER });
};
export const fetchOrders = () => (dispatch: any) => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: FETCH_ORDERS, payload: data });
    });
};
