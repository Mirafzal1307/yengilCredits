import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS } from "../../types/cartType";

const orderReducer = (state = {}, action: any): any => {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    case FETCH_ORDERS:
      return { orders: action.payload };
    default:
      return state;
  }
};
export { orderReducer };
