import { combineReducers } from "redux";
import { brandReducer } from "./brandReducer";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { todoReducer } from "./basketReducer";
import { cardReducer } from "./cardReducer";
import { productByIdReducer } from "./detailsByIdReducer";
import { productByCategoryReducer } from "./productByCategoryReducer";
import { brandReducerClient } from "./brandReducerClient";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";
import { productDetailsReducer } from "./detailsReducer";
import productsReducer from "../cart/reducer";
import cartreducer from "../cart/cartReducer";

const rootReducer = combineReducers({
  product: productReducer,
  brand: brandReducer,
  category: categoryReducer,
  card: cardReducer,
  byId: productByIdReducer,
  productByCategoryReducer,
  brandClient: brandReducerClient,
  cart: cartReducer,
  order: orderReducer,
  details: productDetailsReducer,
  productsReducer,
  cartreducer,
});

export type rootState = ReturnType<typeof rootReducer>;

export default rootReducer;
