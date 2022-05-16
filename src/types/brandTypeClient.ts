export interface BrandsStateClient {
    brands: any[];
    loading: boolean;
    error: null | string;
}

export enum BrandActionTypesClient {
    FETCH_BRANDS_CLIENT = "FETCH_BRANDS_CLIENT",
    FETCH_BRANDS_SUCCESS_CLIENT = "FETCH_BRANDS_SUCCESS_CLIENT",
    FETCH_BRANDS_ERROR_CLIENT = "FETCH_BRANDS_ERROR_CLIENT",
}

interface FetchBrandsActionClient {
    type: BrandActionTypesClient.FETCH_BRANDS_CLIENT;
}

interface FetchBrandsSuccessActionClient {
    type: BrandActionTypesClient.FETCH_BRANDS_SUCCESS_CLIENT;
    payload: any[]
}

interface FetchBrandsErrorActionClient {
    type: BrandActionTypesClient.FETCH_BRANDS_ERROR_CLIENT;
    payload: string;
}

export type BrandActionClient = FetchBrandsActionClient | FetchBrandsErrorActionClient | FetchBrandsSuccessActionClient 