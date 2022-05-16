import { ProductAction, ProductActionTypes } from "../../types/productsType";
import { Dispatch } from "redux";
import axios from "axios";
import { getProductList } from "../../Api/admin/AdminProductApi";

export const fetchProducts = (p: any) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS })
            const response = await getProductList(`${p}`, {});
            const datax: any = response
            //console.log(datax.data);
           



            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS, payload: response.data })

        } catch (e) {
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
                payload: 'Foydalanuvchilarni yuklashda xatolik yuz berdi'
            })
        }
    }
}
