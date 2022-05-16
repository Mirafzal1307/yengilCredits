import { ProductAction, ProductActionByIdTypes } from "../../types/details";
import { Dispatch } from "redux";
import axios from "axios";
import { getProductItem } from "../../Api/admin/AdminProductApi";

export const fetchProductsById = (id: any) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID })
            const response = await getProductItem(`${id}`);
            // console.log(response);
            
            const datax: any = response?.data
            console.log(datax);
           

            dispatch({ type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_SUCCESS, payload: response.data })

        } catch (e) {
            dispatch({
                type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_ERROR,
                payload: 'Foydalanuvchilarni yuklashda xatolik yuz berdi'
            })
        }
    }
}
