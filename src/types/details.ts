export interface ProductsByIdState {
    products: any;
    loading: boolean;
    error: null | string;
}


export enum ProductActionByIdTypes {
    FETCH_PRODUCTS_BY_ID = 'FETCH_PRODUCTS_BY_ID',
    FETCH_PRODUCTS_BY_ID_SUCCESS = 'FETCH_PRODUCTS_BY_ID_SUCCESS',
    FETCH_PRODUCTS_BY_ID_ERROR = 'FETCH_PRODUCTS_BY_ID_ERROR',
}

interface FetchProductsByIdAction {
    type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID;
}
interface FetchProductsByIdSuccessAction {
    type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_SUCCESS;
    payload: any
}

interface FetchProductsByIdErrorAction {
    type: ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_ERROR;
    payload: string;
}

export type ProductAction = FetchProductsByIdAction | FetchProductsByIdSuccessAction | FetchProductsByIdErrorAction