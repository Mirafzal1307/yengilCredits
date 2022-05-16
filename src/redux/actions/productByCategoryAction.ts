import { Dispatch } from "redux";
import { ProductActionByCategory, ProductActionTypesByCategory } from "../../types/productByCategoryType";
import { getProductByCategory } from "../../Api/client/ClientProductByCategory";

export const fetchProductsByCategory = (id: any) => {
    return async (dispatch: Dispatch<ProductActionByCategory>) => {
        try {
            dispatch({ type: ProductActionTypesByCategory.FETCH_PRODUCTS_BY_CATEGORY })
            const response = await getProductByCategory(id);
            dispatch({ type: ProductActionTypesByCategory.FETCH_PRODUCTS_SUCCESS_BY_CATEGORY, payload: response.data })
        } catch (e) {
            dispatch({
                type: ProductActionTypesByCategory.FETCH_PRODUCTS_ERROR_BY_CATEGORY,
                payload: 'Foydalanuvchilarni yuklashda xatolik yuz berdi'
            })
        }
    }
}