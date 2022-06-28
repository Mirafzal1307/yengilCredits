import {
  BrandAction,
  BrandActionTypes,
  BrandsState,
} from "../../types/brandType";

const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
};

export const brandReducer = (
  state = initialState,
  action: BrandAction,
): BrandsState => {
  switch (action.type) {
    case BrandActionTypes.FETCH_BRANDS:
      return { loading: true, error: null, brands: [] };
    case BrandActionTypes.FETCH_BRANDS_SUCCESS:
      return { loading: false, error: null, brands: action.payload };
    case BrandActionTypes.FETCH_BRANDS_ERROR:
      return { loading: false, error: action.payload, brands: [] };
    default:
      return state;
  }
};
