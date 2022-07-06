export interface ProductsDetailsState {
  products: any;
  loading: boolean;
  error: null | string;
}

export enum ProductActionForDetailsTypes {
  FETCH_PRODUCTS_FOR_DETAILS = "FETCH_PRODUCTS_FOR_DETAILS",
  FETCH_PRODUCTS_FOR_DETAILS_SUCCESS = "FETCH_PRODUCTS_FOR_DETAILS_SUCCESS",
  FETCH_PRODUCTS_FOR_DETAILS_ERROR = "FETCH_PRODUCTS_FOR_DETAILS_ERROR",
}

interface FetchProductsForDetailsAction {
  type: ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS;
}
interface FetchProductsForDetailsSuccessAction {
  type: ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS_SUCCESS;
  payload: any;
}

interface FetchProductsForDetailsErrorAction {
  type: ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS_ERROR;
  payload: string;
}

export type ProductAction =
  | FetchProductsForDetailsAction
  | FetchProductsForDetailsErrorAction
  | FetchProductsForDetailsSuccessAction;
