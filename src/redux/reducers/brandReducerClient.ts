import { BrandActionClient, BrandActionTypesClient, BrandsStateClient } from "../../types/brandTypeClient";

const initialState: BrandsStateClient = {
    brands: [],
    loading: false,
    error: null
}

export const brandReducerClient = (state = initialState, action: BrandActionClient): BrandsStateClient => {
    switch (action.type) {
        case BrandActionTypesClient.FETCH_BRANDS_CLIENT:
            return {loading: true, error: null, brands: []}
        case BrandActionTypesClient.FETCH_BRANDS_SUCCESS_CLIENT:
            return {loading: false, error: null, brands: action.payload}
        case BrandActionTypesClient.FETCH_BRANDS_ERROR_CLIENT:
            return {loading: false, error: action.payload, brands: []}
        default:
            return state
    }
}