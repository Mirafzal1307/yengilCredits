import { Dispatch } from "redux";
import {
  BrandActionClient,
  BrandActionTypesClient,
} from "../../types/brandTypeClient";
import { getProductCards } from "../../Api/client/MainProductsApi";

export const fetchBrands =
  () => async (dispatch: Dispatch<BrandActionClient>) => {
    try {
      dispatch({ type: BrandActionTypesClient.FETCH_BRANDS_CLIENT });
      const response = await getProductCards();
      const { data } = response;
      dispatch({
        type: BrandActionTypesClient.FETCH_BRANDS_SUCCESS_CLIENT,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: BrandActionTypesClient.FETCH_BRANDS_ERROR_CLIENT,
        payload: "Ma'lumotlarni yuklashda xatolik yuz berdi...",
      });
    }
  };
