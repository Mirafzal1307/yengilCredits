import { BrandActionClient, BrandActionTypesClient } from "../../types/brandTypeClient";
import { Dispatch } from "redux";
import { getProductCards } from "../../Api/client/MainProductsApi";

export const fetchBrands = () => {
    return async (dispatch: Dispatch<BrandActionClient>) => {
        try {
            dispatch({ type: BrandActionTypesClient.FETCH_BRANDS_CLIENT });
            const response = await getProductCards();
            let data: any = response.data;
            dispatch({ type: BrandActionTypesClient.FETCH_BRANDS_SUCCESS_CLIENT, payload: data });
        } catch (e) {
            dispatch({
                type: BrandActionTypesClient.FETCH_BRANDS_ERROR_CLIENT,
                payload: "Ma'lumotlarni yuklashda xatolik yuz berdi..."
            });
        }
    };
};
