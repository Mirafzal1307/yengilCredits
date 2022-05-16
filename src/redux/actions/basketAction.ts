import {Dispatch} from "redux";
import axios from "axios";
import {TodoAction, TodoActionTypes} from "../../types/basket";
import { getProductCards } from "../../Api/client/MainProductsApi";

export const fetchTodos = () => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.FETCH_TODOS})
            const response = await getProductCards();
            
            let productData: any = response.data;
            // setTimeout(() => {
            //     dispatch({type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: productData.with_discount_products})
            // }, 500)
        } catch (e) {
            dispatch({
                type: TodoActionTypes.FETCH_TODOS_ERROR,
                payload: 'UPPS, something went wrong'
            })
        }
    }
}