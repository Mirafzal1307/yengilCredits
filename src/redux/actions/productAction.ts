import { Dispatch } from "redux";
import axios from "axios";
import { ProductAction, ProductActionTypes } from "../../types/productsType";
import { getProductList } from "../../Api/admin/AdminProductApi";

export const fetchProducts =
  (p: any) => async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductActionTypes.FETCH_PRODUCTS });
      const response = await getProductList(`${p}`, {});
      const datax: any = response;
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
        payload: "Foydalanuvchilarni yuklashda xatolik yuz berdi",
      });
    }
  };
