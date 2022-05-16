import { ProductsState, ProductActionByCategory, ProductActionTypesByCategory } from "../../types/productByCategoryType";

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
}

export const productByCategoryReducer = (state = initialState, action: ProductActionByCategory): ProductsState => {
    switch (action.type) {
        case ProductActionTypesByCategory.FETCH_PRODUCTS_BY_CATEGORY:
            return { loading: true, error: null, products: [] }
        case ProductActionTypesByCategory.FETCH_PRODUCTS_SUCCESS_BY_CATEGORY:
            return { loading: false, error: null, products: action.payload }
        case ProductActionTypesByCategory.FETCH_PRODUCTS_ERROR_BY_CATEGORY:
            return { loading: false, error: action.payload, products: [] }
        default:
            return state
    }
}