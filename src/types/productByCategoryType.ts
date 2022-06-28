export interface ProductsState {
  products: any;
  loading: boolean;
  error: null | string;
}

export enum ProductActionTypesByCategory {
  FETCH_PRODUCTS_BY_CATEGORY = "FETCH_PRODUCTS_BY_CATEGORY",
  FETCH_PRODUCTS_SUCCESS_BY_CATEGORY = "FETCH_PRODUCTS_SUCCESS_BY_CATEGORY",
  FETCH_PRODUCTS_ERROR_BY_CATEGORY = "FETCH_PRODUCTS_ERROR_BY_CATEGORY",
}

interface FetchProductsActionByCategory {
  type: ProductActionTypesByCategory.FETCH_PRODUCTS_BY_CATEGORY;
}
interface FetchProductsSuccessActionByCategory {
  type: ProductActionTypesByCategory.FETCH_PRODUCTS_SUCCESS_BY_CATEGORY;
  payload: any;
}

interface FetchProductsErrorActionByCategory {
  type: ProductActionTypesByCategory.FETCH_PRODUCTS_ERROR_BY_CATEGORY;
  payload: string;
}

export type ProductActionByCategory =
  | FetchProductsActionByCategory
  | FetchProductsSuccessActionByCategory
  | FetchProductsErrorActionByCategory;
