export interface CategoryState {
    category: any
    loading: boolean
    error: null | string
}

export enum CategoryActionTypes {
    FETCH_CATEGORY = "FETCH_CATEGORY",
    FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS",
    FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR",
}

interface FetchCategoryAction {
    type: CategoryActionTypes.FETCH_CATEGORY
}

interface FetchCategorySuccessAction {
    type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS
    payload: any
}

interface FetchCategoryErrorAction {
    type: CategoryActionTypes.FETCH_CATEGORY_ERROR
    payload: string
}

export type CategoryAction = FetchCategoryAction | FetchCategorySuccessAction | FetchCategoryErrorAction