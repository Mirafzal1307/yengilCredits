import { CategoryAction, CategoryActionTypes } from "../../types/CategoryType";
import { Dispatch } from "redux";
import { getCategoryList } from "../../Api/admin/AdminCategoryApi";

export const fetchCategory = (p: any) => {
    return async (dispatch: Dispatch<CategoryAction>) => {
        try {
            dispatch({ type: CategoryActionTypes.FETCH_CATEGORY })
            const response = await getCategoryList(`${p}`, {})
            const data: any = response;
            //console.log(data.data);
            dispatch({ type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS, payload: response.data })
        } catch (e) {
           dispatch({
               type: CategoryActionTypes.FETCH_CATEGORY_ERROR,
               payload: "Uppss xatolik yuz berdi"
           })
        }
    }
}