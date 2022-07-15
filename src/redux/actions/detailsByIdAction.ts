import { Dispatch } from "redux";
import axios from "axios";
import { ProductAction, ProductActionByIdTypes } from "../../types/details";
import { getProductItem } from "../../Api/admin/AdminProductApi";

export const fetchProductsById =
  (id: any) => async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID });
      const response = await getProductItem(`${id}`);
      const datax: any = response?.data;
      dispatch({
        type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_SUCCESS,
        payload: datax,
      });
    } catch (e) {
      dispatch({
        type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_ERROR,
        payload: "Foydalanuvchilarni yuklashda xatolik yuz berdi",
      });
    }
  };
