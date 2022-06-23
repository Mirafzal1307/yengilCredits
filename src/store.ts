import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootState } from "./redux/reducers";

function saveToLocalStorage(state: rootState): void {
  try {
    const localStorageState = JSON.stringify(state);
    localStorage.setItem("state", localStorageState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage(): any {
  const localStorageState = localStorage.getItem("state");
  if (localStorageState === null) return undefined;
  return JSON.parse(localStorageState);
}

const storeFactory = (): any => {
  const middleware = [thunk];
  const reduxStore = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  reduxStore.subscribe(() => saveToLocalStorage(reduxStore.getState()));
  return reduxStore;
};

export default storeFactory;
