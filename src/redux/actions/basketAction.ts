import { Dispatch } from "redux";
import axios from "axios";
import { TodoAction, TodoActionTypes } from "../../types/basket";
import { getProductCards } from "../../Api/client/MainProductsApi";

export const fetchTodos = () => async (dispatch: Dispatch<TodoAction>) => {
  try {
    dispatch({ type: TodoActionTypes.FETCH_TODOS });
    const response = await getProductCards();
    const productData: any = response.data;
  } catch (e) {
    dispatch({
      type: TodoActionTypes.FETCH_TODOS_ERROR,
      payload: "UPPS, something went wrong",
    });
  }
};
