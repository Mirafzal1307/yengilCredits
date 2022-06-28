import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../redux/actions";

export const useActions = (): any => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
