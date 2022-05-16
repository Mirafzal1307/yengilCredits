import { CardAction, CardActionTypes } from "../../types/cardType";
import { Dispatch } from "redux";
import { getProductCards } from "../../Api/client/MainProductsApi";

export const fetchCards = () => {
  return async (dispatch: Dispatch<CardAction>) => {
    try {
      dispatch({ type: CardActionTypes.FETCH_CARDS });
      const response = await getProductCards();
      let data: any = response.data;
      dispatch({ type: CardActionTypes.FETCH_CARDS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: CardActionTypes.FETCH_CARDS_ERROR,
        payload: "Ma'lumotlarni yuklashda xatolik yuz berdi...",
      });
    }
  };
};
