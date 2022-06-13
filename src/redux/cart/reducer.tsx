import { ProductActions } from './action';
import { Product } from './types';


type InitialState = {
  products: any,
  filteredProducts: Product[],
  keyword: any,
  darktheme: boolean
  productByCategory: Product[],
};

const initialState: InitialState = {
  products: [],
  filteredProducts: [],
  keyword: undefined,
  darktheme: false,
  productByCategory: [],
};


export default function productsReducer(state = initialState, action: ProductActions): InitialState {
  switch (action.type) {
    case "GET_PRODUCTS": {

      return {
        ...state,
        products: action.payload.products,
     };
    }
    
    case "GET_DEMO_PRODUCTS": {
      return {
        ...state,
        products: action.payload.products,
        filteredProducts: action.payload.products
      };
    }
    case "GET_FILTERED_PRODUCTS": {
      let products = state.products.filter((product: any) => {
        return (
          product.short_name.toLocaleLowerCase()
            .indexOf(action.payload.keyword.toLocaleLowerCase()) !== -1
        )
      });
      return {
        ...state,
        filteredProducts: products
      };
    }

    case "PRODUCT_BY_CATEGORY": {

      let products = state.products

      if (action.payload.category !== "All") {
        products = state.products.filter((product: any) => {
          return (
          //@ts-ignore
            // eslint-disable-next-line eqeqeq
            product.category == action.payload.category
          )
        });
      }

      return {
        ...state,
        filteredProducts: products
      }
    };
    case "THEME_CHANGE": {
      let theme = action.payload.darktheme;
      if (theme) {
        theme = false;
      }
      else {
        theme = true;
      }

      return {
        ...state,
        darktheme: theme,
      };
    }

    default:
      return state;
  }
}