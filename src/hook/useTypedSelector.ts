import {TypedUseSelectorHook, useSelector} from "react-redux";
import {rootState} from "../redux/reducers/index";

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector
