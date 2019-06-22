import { createStore, combineReducers } from "redux";
import repositoriesReducer from "../reducers/repositories";
import filtersReducer from "../reducers/filters";
import fetchReducer from "../reducers/fetch";
import userReducer from "../reducers/user";
import { saveState } from "./configureLocalStorage";

export default () => {
  const store = createStore(
    combineReducers({
      repositories: repositoriesReducer,
      filters: filtersReducer,
      fetch: fetchReducer,
      user: userReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};
