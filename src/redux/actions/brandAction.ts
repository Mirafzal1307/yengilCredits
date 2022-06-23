import { Dispatch } from "redux";
import { BrandAction, BrandActionTypes } from "../../types/brandType";
import { getAllBrandData } from "../../Api/admin/AdminBrandApi";

export const fetchBrands = () => async (dispatch: Dispatch<BrandAction>) => {
  try {
    dispatch({ type: BrandActionTypes.FETCH_BRANDS });
    const response = await getAllBrandData({});
    const { data } = response;

    dispatch({ type: BrandActionTypes.FETCH_BRANDS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: BrandActionTypes.FETCH_BRANDS_ERROR,
      payload: "Ma'lumotlarni yuklashda xatolik yuz berdi...",
    });
  }
};
