import { BrandAction, BrandActionTypes } from "../../types/brandType";
import { Dispatch } from "redux";
import { getAllBrandData } from "../../Api/admin/AdminBrandApi";

export const fetchBrands = () => {
  return async (dispatch: Dispatch<BrandAction>) => {
    try {
      dispatch({ type: BrandActionTypes.FETCH_BRANDS });
      const response = await getAllBrandData({});
      let data: any = response.data;

      dispatch({ type: BrandActionTypes.FETCH_BRANDS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: BrandActionTypes.FETCH_BRANDS_ERROR,
        payload: "Ma'lumotlarni yuklashda xatolik yuz berdi..."
      });
    }
  };
};
