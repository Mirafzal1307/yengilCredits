export interface BrandsState {
  brands: any[];
  loading: boolean;
  error: null | string;
}

export enum BrandActionTypes {
  FETCH_BRANDS = "FETCH_BRANDS",
  FETCH_BRANDS_SUCCESS = "FETCH_BRANDS_SUCCESS",
  FETCH_BRANDS_ERROR = "FETCH_BRANDS_ERROR",
}

interface FetchBrandsAction {
    type: BrandActionTypes.FETCH_BRANDS;
}

interface FetchBrandsSuccessAction {
    type: BrandActionTypes.FETCH_BRANDS_SUCCESS;
    payload: any[]
}

interface FetchBrandsErrorAction {
    type: BrandActionTypes.FETCH_BRANDS_ERROR;
    payload: string;
}

export type BrandAction = FetchBrandsAction | FetchBrandsErrorAction | FetchBrandsSuccessAction 