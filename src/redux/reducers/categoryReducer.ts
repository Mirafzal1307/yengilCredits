import {
  CategoryAction,
  CategoryActionTypes,
  CategoryState,
} from "../../types/CategoryType";

const initialState: CategoryState = {
  category: [],
  loading: false,
  error: null,
};

export const categoryReducer = (
  state = initialState,
  action: CategoryAction,
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORY:
      return { loading: true, error: null, category: [] };
    case CategoryActionTypes.FETCH_CATEGORY_SUCCESS:
      return { loading: false, error: null, category: action.payload };
    case CategoryActionTypes.FETCH_CATEGORY_ERROR:
      return { loading: false, error: action.payload, category: [] };
    default:
      return state;
  }
};
