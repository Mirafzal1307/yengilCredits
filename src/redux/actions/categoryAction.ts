import { Dispatch } from "redux";
import { CategoryAction, CategoryActionTypes } from "../../types/CategoryType";
import { getCategoryList } from "../../Api/admin/AdminCategoryApi";

export const fetchCategory =
  (p: any) => async (dispatch: Dispatch<CategoryAction>) => {
    try {
      dispatch({ type: CategoryActionTypes.FETCH_CATEGORY });
      const response = await getCategoryList(`${p}`, {});
      const data: any = response;
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORY_ERROR,
        payload: "Uppss xatolik yuz berdi",
      });
    }
  };
