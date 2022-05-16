import { ProductAction, ProductActionByIdTypes, ProductsByIdState } from "../../types/details";

const initialState: ProductsByIdState = {
    products: [],
    loading: false,
    error: null
}

export const productByIdReducer = (state = initialState, action: ProductAction): ProductsByIdState => {
    switch (action.type) {
        case ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID:
            return {loading: true, error: null, products: []}
        case ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_SUCCESS:
            return {loading: false, error: null, products: action.payload}
        case ProductActionByIdTypes.FETCH_PRODUCTS_BY_ID_ERROR:
            return {loading: false, error: action.payload, products: []}
        default:
            return state
    }
}