import { combineReducers } from "redux";
import productsReducer from "./reducer";
import cartreducer from "./cartReducer";
// import authorization from "../reducers/authorizationReducer";

const rootReducer = combineReducers({ productsReducer, cartreducer });
export type rootState = ReturnType<typeof rootReducer>;
export default rootReducer;
