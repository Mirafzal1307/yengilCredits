import { ProductAction, ProductActionForDetailsTypes, ProductsDetailsState } from "../../types/detailsForClient";

const initialState: ProductsDetailsState = {
    products: [],
    loading: false,
    error: null
}

export const productDetailsReducer = (state = initialState, action: ProductAction): ProductsDetailsState => {
    switch (action.type) {
        case ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS:
            return {loading: true, error: null, products: []}
        case ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS_SUCCESS:
            return {loading: false, error: null, products: action.payload}
        case ProductActionForDetailsTypes.FETCH_PRODUCTS_FOR_DETAILS_ERROR:
            return {loading: false, error: action.payload, products: []}
        default:
            return state
    }
}