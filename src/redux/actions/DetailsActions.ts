import { ProductAction, ProductActionForDetailsTypes } from "../../types/detailsForClient";
import { Dispatch } from "redux";
import axios from "axios";
import { getProductItem } from "../../Api/admin/AdminProductApi";

export const fetchProductClientDetails = (id: any) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS })
            const response = await getProductItem(`${id}`);
            const datax: any = response
                   dispatch({ type: ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS_SUCCESS, payload: response.data })

        } catch (e) {
            dispatch({
                type: ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS_ERROR,
                payload: 'Foydalanuvchilarni yuklashda xatolik yuz berdi'
            })
        }
    }
}
